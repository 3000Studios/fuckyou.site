#!/usr/bin/env node
// Self-contained deploy pipeline. No GitHub Actions involved.
// Usage:
//   node scripts/deploy.mjs [--skip-build]
// Credentials resolution order:
//   1. Env vars CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
//   2. File .cloudflare-token (gitignored) with "TOKEN=..." / "ACCOUNT_ID=..." lines
// Run from repo root. Safe to call multiple times; Cloudflare Pages dedupes.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PROJECT = "fuckyou-site";
const BRANCH = "main";

function log(tag, msg) {
  const stamp = new Date().toISOString().slice(11, 19);
  console.log(`[${stamp}] [${tag}] ${msg}`);
}

function loadLocalCreds() {
  const path = resolve(ROOT, ".cloudflare-token");
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

function resolveCreds() {
  const local = loadLocalCreds();
  const token = process.env.CLOUDFLARE_API_TOKEN || local.TOKEN || local.CLOUDFLARE_API_TOKEN;
  const account =
    process.env.CLOUDFLARE_ACCOUNT_ID || local.ACCOUNT_ID || local.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !account) {
    console.error(
      "[deploy] Missing Cloudflare credentials.\n" +
        "  Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in env,\n" +
        "  or create .cloudflare-token at repo root with:\n" +
        "    TOKEN=<api-token>\n" +
        "    ACCOUNT_ID=<account-id>\n"
    );
    process.exit(2);
  }
  return { token, account };
}

function run(cmd, args, env) {
  const res = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...(env || {}) },
  });
  if (res.status !== 0) {
    console.error(`[deploy] command failed: ${cmd} ${args.join(" ")}`);
    process.exit(res.status ?? 1);
  }
}

function main() {
  const skipBuild = process.argv.includes("--skip-build");
  const { token, account } = resolveCreds();

  if (!skipBuild) {
    log("build", "running npm run build");
    run("npm", ["run", "build"]);
  } else {
    log("build", "skipped (--skip-build)");
  }

  log("deploy", `wrangler pages deploy → ${PROJECT} (branch=${BRANCH})`);
  run(
    "npx",
    [
      "--yes",
      "wrangler@4",
      "pages",
      "deploy",
      "dist",
      `--project-name=${PROJECT}`,
      `--branch=${BRANCH}`,
      "--commit-dirty=true",
    ],
    {
      CLOUDFLARE_API_TOKEN: token,
      CLOUDFLARE_ACCOUNT_ID: account,
    }
  );
  log("deploy", "done → https://fuckyou.site");
}

main();
