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

function loadEnvFile(path) {
  if (!path || !existsSync(path)) return {};
  const raw = readFileSync(path, "utf8");
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || /^\s*#/.test(line)) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
  return out;
}

function mergeEnv(vars) {
  for (const [k, v] of Object.entries(vars || {})) {
    if (process.env[k] == null && v != null && String(v).length > 0) {
      process.env[k] = String(v);
    }
  }
}

function tryLoadGlobalEnv() {
  const explicit = process.env.CODEX_GLOBAL_ENV;
  const home = process.env.USERPROFILE || process.env.HOME;
  const fallback = home ? resolve(home, ".config", "env", "global.env") : null;
  const path = explicit || fallback;
  const vars = loadEnvFile(path);
  if (Object.keys(vars).length > 0) {
    log("env", `loaded ${Object.keys(vars).length} vars from ${path}`);
    mergeEnv(vars);
  }
}

function loadLocalCreds() {
  const path = resolve(ROOT, ".cloudflare-token");
  if (!existsSync(path)) return {};
  return loadEnvFile(path);
}

function resolveCreds() {
  const local = loadLocalCreds();
  const token = process.env.CLOUDFLARE_API_TOKEN || local.TOKEN || local.CLOUDFLARE_API_TOKEN;
  const account =
    process.env.CLOUDFLARE_ACCOUNT_ID || local.ACCOUNT_ID || local.CLOUDFLARE_ACCOUNT_ID;
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
  tryLoadGlobalEnv();
  const skipBuild = process.argv.includes("--skip-build");
  const { token, account } = resolveCreds();

  if (!skipBuild) {
    log("build", "running npm run build");
    run("npm", ["run", "build"]);
  } else {
    log("build", "skipped (--skip-build)");
  }

  log("deploy", `wrangler pages deploy → ${PROJECT} (branch=${BRANCH})`);
  const args = [
    "--yes",
    "wrangler@4",
    "pages",
    "deploy",
    "dist",
    `--project-name=${PROJECT}`,
    `--branch=${BRANCH}`,
    "--commit-dirty=true",
  ];

  if (token && account) {
    run("npx", args, { CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: account });
  } else {
    log("auth", "no CLOUDFLARE_* creds found; using wrangler OAuth login");
    run("npx", args);
  }
  log("deploy", "done → https://fuckyou.site");
}

main();
