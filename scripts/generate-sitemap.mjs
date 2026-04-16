// Generates public sitemap.xml at dist/sitemap.xml after build.
// Also writes a fresh robots.txt that references the sitemap.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");

const SITE_URL = (process.env.VITE_SITE_URL || "https://fuckyou.site").replace(
  /\/+$/,
  ""
);

// Lightweight loader of categories and article slugs/dates from TypeScript
// sources. Rather than spinning up ts-node, we parse what we need with
// regex — these files are hand-authored and predictable.

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function extractCategories() {
  const src = read("src/data/categories.ts");
  const out = [];
  const rx = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = rx.exec(src))) {
    out.push(m[1]);
  }
  return out;
}

function extractArticles() {
  const idx = read("src/data/articles.ts");
  const rx = /from\s+"\.\/articles\/([^"]+)"/g;
  const files = [];
  let m;
  while ((m = rx.exec(idx))) files.push(m[1]);

  const articles = [];
  for (const f of files) {
    const content = read(`src/data/articles/${f}.ts`);
    const slug = /slug:\s*"([^"]+)"/.exec(content)?.[1];
    const published = /publishedAt:\s*"([^"]+)"/.exec(content)?.[1];
    const updated = /updatedAt:\s*"([^"]+)"/.exec(content)?.[1] || published;
    if (slug && published) {
      articles.push({ slug, published, updated });
    }
  }
  return articles;
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

function build() {
  const today = new Date().toISOString().slice(0, 10);
  const cats = extractCategories();
  const articles = extractArticles();

  const urls = [];
  urls.push(urlEntry(`${SITE_URL}/`, today, "daily", 1.0));
  urls.push(urlEntry(`${SITE_URL}/blog`, today, "daily", 0.9));
  for (const c of cats) {
    urls.push(
      urlEntry(`${SITE_URL}/category/${c}`, today, "daily", 0.8)
    );
  }
  for (const a of articles) {
    urls.push(
      urlEntry(
        `${SITE_URL}/article/${a.slug}`,
        a.updated,
        "weekly",
        0.8
      )
    );
  }
  urls.push(urlEntry(`${SITE_URL}/about`, today, "monthly", 0.5));
  urls.push(urlEntry(`${SITE_URL}/contact`, today, "monthly", 0.4));
  urls.push(urlEntry(`${SITE_URL}/privacy`, today, "yearly", 0.3));
  urls.push(urlEntry(`${SITE_URL}/terms`, today, "yearly", 0.3));
  urls.push(urlEntry(`${SITE_URL}/disclaimer`, today, "yearly", 0.3));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  mkdirSync(distDir, { recursive: true });
  writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf8");

  const robots = `# robots.txt for ${SITE_URL}
User-agent: *
Allow: /
Disallow: /404

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  writeFileSync(resolve(distDir, "robots.txt"), robots, "utf8");

  console.log(
    `[sitemap] wrote ${urls.length} URLs to dist/sitemap.xml (site: ${SITE_URL})`
  );
}

build();
