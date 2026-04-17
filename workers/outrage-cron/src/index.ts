// Hourly outrage generator. Cron-triggered Cloudflare Worker.
// Generates one new "outrage" story and commits it to src/data/outrage.ts
// in the GitHub repo via the GitHub REST API. Cloudflare Pages' git
// integration picks up the commit and redeploys automatically. As a
// belt-and-suspenders fallback, if PAGES_PROJECT + CLOUDFLARE_API_TOKEN
// are present, the Worker will also kick off a Pages deployment.

import { buildStory, serializeStory } from "./story.js";

export interface Env {
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH: string;
  GITHUB_FILE: string;
  GIT_AUTHOR_NAME: string;
  GIT_AUTHOR_EMAIL: string;
  PAGES_PROJECT?: string;
  CLOUDFLARE_API_TOKEN?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
}

const UA = "fuckyou-outrage-cron/1.0 (+https://fuckyou.site)";

function b64encode(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
function b64decode(s: string): string {
  const bin = atob(s.replace(/\s+/g, ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function gh<T = unknown>(
  env: Env,
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "User-Agent": UA,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GitHub ${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

interface GhContents {
  sha: string;
  content: string;
  encoding: "base64";
}

async function getFile(env: Env) {
  const p = `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${encodeURIComponent(
    env.GITHUB_FILE
  )}?ref=${encodeURIComponent(env.GITHUB_BRANCH)}`;
  const r = await gh<GhContents>(env, "GET", p);
  return { sha: r.sha, text: b64decode(r.content) };
}

async function putFile(env: Env, sha: string, text: string, message: string) {
  const p = `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${encodeURIComponent(
    env.GITHUB_FILE
  )}`;
  await gh(env, "PUT", p, {
    message,
    content: b64encode(text),
    sha,
    branch: env.GITHUB_BRANCH,
    committer: { name: env.GIT_AUTHOR_NAME, email: env.GIT_AUTHOR_EMAIL },
    author: { name: env.GIT_AUTHOR_NAME, email: env.GIT_AUTHOR_EMAIL },
  });
}

async function triggerPagesDeploy(env: Env): Promise<string | null> {
  if (!env.PAGES_PROJECT || !env.CLOUDFLARE_API_TOKEN || !env.CLOUDFLARE_ACCOUNT_ID) {
    return null;
  }
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/pages/projects/${env.PAGES_PROJECT}/deployments`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      "User-Agent": UA,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Pages deploy ${res.status}: ${text.slice(0, 400)}`);
  }
  return text.slice(0, 200);
}

async function generateAndCommit(env: Env): Promise<string> {
  const story = buildStory();
  const serialized = `\n${serializeStory(story)}`;

  const { sha, text } = await getFile(env);
  const marker = "export const OUTRAGE_STORIES: OutrageStory[] = [";
  const idx = text.indexOf(marker);
  if (idx === -1) {
    throw new Error("[outrage] marker not found in src/data/outrage.ts");
  }
  const insertAt = idx + marker.length;
  const updated = text.slice(0, insertAt) + serialized + text.slice(insertAt);

  const msg = `chore(outrage): add hourly story ${story.slug}`;
  await putFile(env, sha, updated, msg);
  return story.slug;
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(
      (async () => {
        try {
          const slug = await generateAndCommit(env);
          console.log(`[cron] committed outrage story: ${slug}`);
          try {
            const dep = await triggerPagesDeploy(env);
            if (dep) console.log(`[cron] triggered pages deploy ok`);
          } catch (e) {
            console.warn(`[cron] pages deploy skipped: ${(e as Error).message}`);
          }
        } catch (err) {
          console.error(`[cron] failed: ${(err as Error).message}`);
          throw err;
        }
      })()
    );
  },

  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    // Manual trigger: POST /run?key=...  (key must match GITHUB_TOKEN tail)
    if (url.pathname === "/run" && req.method === "POST") {
      const key = url.searchParams.get("key") || "";
      const expected = env.GITHUB_TOKEN.slice(-8);
      if (key !== expected) {
        return new Response("forbidden", { status: 403 });
      }
      try {
        const slug = await generateAndCommit(env);
        let deployed = false;
        try {
          const dep = await triggerPagesDeploy(env);
          deployed = !!dep;
        } catch (_) {
          deployed = false;
        }
        return new Response(
          JSON.stringify({ ok: true, slug, deployed }, null, 2),
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ ok: false, error: (err as Error).message }, null, 2),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          ok: true,
          name: "fuckyou-outrage-cron",
          repo: `${env.GITHUB_OWNER}/${env.GITHUB_REPO}`,
          branch: env.GITHUB_BRANCH,
          file: env.GITHUB_FILE,
          cron: "hourly :03",
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("not found", { status: 404 });
  },
};
