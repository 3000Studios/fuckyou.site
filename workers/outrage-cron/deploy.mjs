#!/usr/bin/env node
// Direct-to-API Worker deploy, bypassing `wrangler` service-lookup which
// keeps hitting 429. PUTs a single module script with plain_text + secret
// bindings, then sets the cron schedule.
//
// Env required:
//   CLOUDFLARE_API_TOKEN   - token with Workers Scripts Write
//   CLOUDFLARE_ACCOUNT_ID  - account id
//   GITHUB_TOKEN           - used as the worker secret
// Optional:
//   WORKER_NAME    (default "fuckyou-outrage-cron")
//
// Usage: node deploy.mjs

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname);

function loadTokenFile() {
  const path = resolve(ROOT, "..", "..", ".cloudflare-token");
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, "utf8");
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
  return out;
}

const tf = loadTokenFile();
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || tf.TOKEN || tf.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID || tf.ACCOUNT_ID || tf.CLOUDFLARE_ACCOUNT_ID;
const NAME = process.env.WORKER_NAME || "fuckyou-outrage-cron";

if (!API_TOKEN || !ACCOUNT_ID) {
  console.error("Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID");
  process.exit(2);
}

function ghToken() {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.length > 20) {
    return process.env.GITHUB_TOKEN.trim();
  }
  const res = spawnSync("gh", ["auth", "token"], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });
  if (res.status !== 0) {
    console.error("gh auth token failed:", res.stderr?.toString());
    process.exit(2);
  }
  return res.stdout.toString().trim();
}

const GH_TOKEN = ghToken();
if (!GH_TOKEN || GH_TOKEN.length < 20) {
  console.error("Unable to resolve a GitHub token (need repo scope).");
  process.exit(2);
}

async function cf(method, path, body, contentType) {
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    "User-Agent": "outrage-cron-deploy/1.0",
  };
  if (contentType) headers["Content-Type"] = contentType;
  else if (body && typeof body !== "string") headers["Content-Type"] = "application/json";

  const url = `https://api.cloudflare.com/client/v4${path}`;
  const payload = body == null ? undefined : typeof body === "string" ? body : JSON.stringify(body);
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { method, headers, body: payload });
    const text = await res.text();
    if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
      const wait = 5_000 * Math.pow(2, attempt);
      console.warn(`[cf] ${method} ${path} → ${res.status}; waiting ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) {
      throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 600)}`);
    }
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  throw new Error(`${method} ${path} kept 429/5xx after retries`);
}

function buildMultipart(metadata, script) {
  const boundary = `----fmpart${Date.now().toString(16)}`;
  const CRLF = "\r\n";
  const parts = [];
  parts.push(`--${boundary}`);
  parts.push('Content-Disposition: form-data; name="metadata"; filename="metadata.json"');
  parts.push("Content-Type: application/json");
  parts.push("");
  parts.push(JSON.stringify(metadata));
  parts.push(`--${boundary}`);
  parts.push(
    'Content-Disposition: form-data; name="worker.js"; filename="worker.js"'
  );
  parts.push("Content-Type: application/javascript+module");
  parts.push("");
  parts.push(script);
  parts.push(`--${boundary}--`);
  parts.push("");
  return { body: parts.join(CRLF), contentType: `multipart/form-data; boundary=${boundary}` };
}

async function main() {
  const scriptPath = resolve(__dirname, "dist/worker.js");
  const script = readFileSync(scriptPath, "utf8");
  console.log(`[deploy] worker bytes: ${Buffer.byteLength(script, "utf8")}`);

  const metadata = {
    main_module: "worker.js",
    compatibility_date: "2025-01-15",
    bindings: [
      { type: "plain_text", name: "GITHUB_OWNER", text: "3000Studios" },
      { type: "plain_text", name: "GITHUB_REPO", text: "fuckyou.site" },
      { type: "plain_text", name: "GITHUB_BRANCH", text: "main" },
      { type: "plain_text", name: "GITHUB_FILE", text: "src/data/outrage.ts" },
      { type: "plain_text", name: "GIT_AUTHOR_NAME", text: "fuckyou.site bot" },
      { type: "plain_text", name: "GIT_AUTHOR_EMAIL", text: "bot@fuckyou.site" },
      { type: "plain_text", name: "PAGES_PROJECT", text: "fuckyou-site" },
      { type: "plain_text", name: "CLOUDFLARE_ACCOUNT_ID", text: ACCOUNT_ID },
      { type: "secret_text", name: "GITHUB_TOKEN", text: GH_TOKEN },
      { type: "secret_text", name: "CLOUDFLARE_API_TOKEN", text: API_TOKEN },
    ],
  };

  const { body, contentType } = buildMultipart(metadata, script);

  console.log(`[deploy] PUT script ${NAME} (${Buffer.byteLength(body, "utf8")} bytes)`);
  await cf("PUT", `/accounts/${ACCOUNT_ID}/workers/scripts/${NAME}`, body, contentType);
  console.log("[deploy] script uploaded");

  console.log("[deploy] setting cron schedule: hourly :03");
  await cf(
    "PUT",
    `/accounts/${ACCOUNT_ID}/workers/scripts/${NAME}/schedules`,
    [{ cron: "3 * * * *" }]
  );
  console.log("[deploy] schedule set");

  console.log(`[deploy] enabling workers.dev subdomain for ${NAME}`);
  try {
    await cf("POST", `/accounts/${ACCOUNT_ID}/workers/scripts/${NAME}/subdomain`, {
      enabled: true,
    });
  } catch (e) {
    console.warn(`[deploy] subdomain toggle failed (non-fatal): ${(e).message}`);
  }

  console.log("[deploy] ✅ complete");
}

main().catch((err) => {
  console.error("[deploy] FAILED:", err.message);
  process.exit(1);
});
