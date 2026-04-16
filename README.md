# fuckyou.site

> The internet's loudest rant, in one place. A viral humor + commentary engine built to be fast, SEO-ready, AdSense-compliant, and monetized from day one.

[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## What this is

A production-ready, static-first React site optimized for:

- **Revenue**: Google AdSense (auto ads + manual slots), Amazon/affiliate blocks, email capture, sticky mobile ad, exit-intent signup.
- **SEO**: per-page meta, Open Graph, Twitter cards, JSON-LD `Article` schema, canonical URLs, auto-generated `sitemap.xml`, `robots.txt`, keyword-friendly URLs, semantic HTML.
- **Speed**: Vite build, code-split chunks, lazy rendering with `framer-motion`'s viewport-triggered animations, aggressive caching headers via Cloudflare Pages `_headers`.
- **Mobile first**: sticky header, sticky mobile ad, exit-intent that also fires on engaged-mobile sessions, tap targets, readable contrast.
- **Polish**: bold modern dark UI, neon red/blue accent system, subtle gradients, accessible focus states.

## Tech stack

- Vite 5 + React 18 + TypeScript 5
- Tailwind CSS 3 (custom design tokens under `tailwind.config.js`)
- Framer Motion for lightweight entrance animations
- React Router 6 for client routing (SPA, fallback handled by Cloudflare Pages `_redirects`)
- `react-helmet-async` for per-page meta/structured data
- Cloudflare Pages for hosting + Wrangler for deployment

## Project structure

```
.
├── index.html
├── package.json
├── wrangler.toml               # Cloudflare Pages project config
├── public/
│   ├── _headers                # cache + security headers
│   ├── _redirects              # SPA fallback (/* -> /index.html 200)
│   ├── ads.txt                 # AdSense ownership verification
│   ├── robots.txt              # regenerated during build
│   ├── favicon.svg
│   └── og.svg
├── scripts/
│   └── generate-sitemap.mjs    # writes dist/sitemap.xml + dist/robots.txt
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/             # Header, Footer, ArticleCard, AdSlot, etc.
│   ├── data/
│   │   ├── articles/           # one full article per file
│   │   ├── articles.ts         # aggregator + helpers
│   │   ├── categories.ts
│   │   └── types.ts
│   ├── lib/                    # site config, adsense, analytics, utils
│   ├── pages/                  # route components (Home, Blog, Article, ...)
│   └── styles/globals.css
└── tsconfig.json
```

## Getting started locally

```bash
npm install
cp .env.example .env          # or: Copy-Item .env.example .env   (Windows)
npm run dev                   # http://localhost:5173
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Environment variables

Set locally in `.env`, and in Cloudflare for production (Pages → your project → Settings → Environment Variables). **All vars are prefixed `VITE_` so they're bundled for the client.** Never put server secrets here.

| Variable                   | Required | Example                                    | Purpose                                  |
| -------------------------- | -------- | ------------------------------------------ | ---------------------------------------- |
| `VITE_SITE_URL`            | yes      | `https://fuckyou.site`                     | canonical URL, OG, sitemap generation    |
| `VITE_GOOGLE_ADSENSE_ID`   | yes      | `ca-pub-XXXXXXXXXXXXXXXX`                  | AdSense publisher ID (enables ad loader) |
| `VITE_CONTACT_EMAIL`       | yes      | `contact@fuckyou.site`                     | contact form fallback / footer links     |
| `VITE_GA_MEASUREMENT_ID`   | optional | `G-XXXXXXXXXX`                             | Google Analytics 4 measurement ID        |

If `VITE_GOOGLE_ADSENSE_ID` is not set or is still the placeholder, ad slots render as styled placeholders (useful in dev).

## Deploying to Cloudflare Pages

The domain `fuckyou.site` is already on Cloudflare nameservers (via Namecheap). These steps connect a Pages project to that domain.

### 1. Install the Cloudflare CLI and log in

```bash
npm install               # installs wrangler as a dev dependency
npx wrangler login        # opens browser to authorize
```

### 2. One-time: create the Pages project

```bash
npm run deploy:create
# equivalent to: npx wrangler pages project create fuckyou-site --production-branch=main
```

### 3. Configure production environment variables

In the Cloudflare dashboard → **Pages → fuckyou-site → Settings → Environment variables**, add:

- `VITE_SITE_URL` = `https://fuckyou.site`
- `VITE_GOOGLE_ADSENSE_ID` = `ca-pub-XXXXXXXXXXXXXXXX`
- `VITE_CONTACT_EMAIL` = `contact@fuckyou.site`
- `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX` (optional)

These are read at build time. After changing them, rebuild and redeploy.

### 4. Deploy

```bash
npm run deploy
```

This runs:

1. `npm run build` — TypeScript check, Vite production build, sitemap generator.
2. `wrangler pages deploy dist --project-name=fuckyou-site` — uploads `dist/` to Cloudflare.

Wrangler will print a preview URL (e.g. `https://<hash>.fuckyou-site.pages.dev`). The first production deploy also becomes `https://fuckyou-site.pages.dev`.

### 5. Bind the custom domain `fuckyou.site`

Cloudflare dashboard → **Pages → fuckyou-site → Custom domains → Set up a custom domain**:

1. Enter `fuckyou.site`.
2. Since the domain is already on Cloudflare nameservers, it automatically creates the required `CNAME` record (or `AAAA` apex via Cloudflare proxying). Accept the prompts.
3. Repeat for `www.fuckyou.site` if desired — Cloudflare will auto-redirect to the root.
4. SSL is issued automatically (Universal SSL).

Your site is now live at **https://fuckyou.site**.

### Continuous deployment (optional)

If you connect a Git repo in Cloudflare dashboard → **Pages → fuckyou-site → Settings → Build & deployments**, use:

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: `20` or later (set in "Environment variables" as `NODE_VERSION=20`)

Every push to `main` then deploys automatically.

## Google AdSense setup

1. Apply for AdSense at <https://www.google.com/adsense/>. Use the verified domain `fuckyou.site`.
2. Once approved, grab your publisher ID (looks like `ca-pub-XXXXXXXXXXXXXXXX`).
3. Set `VITE_GOOGLE_ADSENSE_ID` locally and in Cloudflare. The loader script and the `google-adsense-account` meta tag are then injected automatically on page load (see `src/lib/adsense.ts`).
4. Update `public/ads.txt`: replace `pub-XXXXXXXXXXXXXXXX` with your publisher ID. This file must be accessible at `https://fuckyou.site/ads.txt` for verified monetization.
5. In the AdSense dashboard, enable **Auto ads** for `fuckyou.site` — the injected loader will handle them.
6. For manual ad slots (recommended for best CTR in key positions): create ad units in AdSense, copy the slot IDs, and replace the `slot` props in:
   - `src/pages/HomePage.tsx` → `home-top-banner`, `home-mid-rectangle`, `home-bottom`
   - `src/pages/BlogPage.tsx` → `blog-top`
   - `src/pages/CategoryPage.tsx` → `category-top`
   - `src/pages/ArticlePage.tsx` → `article-top`, `article-bottom`
   - `src/components/ArticleContent.tsx` (via `ad` blocks in each article) → `in-article`
   - `src/components/ads/StickyMobileAd.tsx` → `sticky-mobile`

Approval tips — this site is already compliant:

- Clear **About**, **Contact**, **Privacy**, **Terms**, **Disclaimer** pages.
- No explicit, hateful, or violating content. Edgy humor only.
- Affiliate disclosure present.
- `ads.txt` in `public/`.
- Sitemap and robots.txt valid.

## Affiliate system

Every article can include an `affiliate` block in its `content` array:

```ts
{
  type: "affiliate",
  title: "Gear that quietly saved our sanity",
  description: "We're not telling you to buy your way out of burnout...",
  items: [
    { name: "Noise-cancelling headphones",
      blurb: "The 'please do not speak to me right now' helmet.",
      url: "https://www.amazon.com/s?k=noise+cancelling+headphones",
      tag: "Focus" },
    // ...
  ],
},
```

Affiliate clicks are tagged `rel="nofollow sponsored noopener"` automatically. Click events fire via `track()` (`src/lib/analytics.ts`) so you can see performance in Google Analytics.

**To switch to Amazon Associates:** append your tracking tag to each URL (e.g. `?tag=yourtag-20`). For other programs (ShareASale, Impact, CJ, Skimlinks), just swap the `url` field.

## Adding content

1. Create `src/data/articles/<slug>.ts` (use an existing file as a template).
2. Fill in `slug`, `title`, `description`, `category`, `tags`, `publishedAt`, `hero`, `tldr`, and `content`.
3. Append the import to `src/data/articles.ts`:

   ```ts
   import { article as aNew } from "./articles/<slug>";
   export const ARTICLES: Article[] = [/* existing */, aNew];
   ```

4. Run `npm run build` — the sitemap will include the new URL automatically.

### Scaling to 100+ articles

- Split `ARTICLES` into dynamic `import()` chunks by category (only needed around ~200+ entries for bundle hygiene).
- Swap the in-memory search on `/blog` for a prebuilt index (e.g. Fuse.js over a JSON payload).
- Introduce full MDX via `@mdx-js/rollup` if you want inline JSX inside posts — today the content is pure structured data, which keeps the bundle clean.

## Analytics and tracking

- Page views fire automatically on route change.
- Custom events available via `track({ name, params })` from `src/lib/analytics.ts`:
  - `affiliate_click`
  - `newsletter_signup`
  - `contact_submit`
  - `share`
- Add Cloudflare Web Analytics in the CF dashboard → **Analytics & Logs → Web Analytics** for free, privacy-preserving metrics with zero code changes.

## Newsletter integration

`NewsletterForm` currently simulates success client-side so the UX works immediately. To hook up a real provider:

1. Replace the `new Promise(...)` stub in `src/components/NewsletterForm.tsx` with a `fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email, placement }) })`.
2. Add a Pages Function at `functions/api/subscribe.ts` that forwards to Buttondown, ConvertKit, Mailchimp, or Beehiiv using a server-side secret (set in Cloudflare as a Plain-text variable).

## Scripts

| Command               | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| `npm run dev`         | Local dev at http://localhost:5173                    |
| `npm run build`       | Type-check, build, generate sitemap + robots          |
| `npm run preview`     | Preview the production build                          |
| `npm run deploy`      | Build + deploy to Cloudflare Pages                    |
| `npm run deploy:create` | Create the Pages project (run once)                 |

## Accessibility notes

- Skip-to-content link at the top of every page.
- All interactive elements are keyboard reachable with visible focus (neon red ring).
- Modal has `role="dialog"` + `aria-modal` + labelled heading + close control.
- Color contrast passes WCAG AA on body text and UI.
- `prefers-reduced-motion` is respected globally in `globals.css`.

## License

Copyright © 2026. All rights reserved. Content and branding are not licensed for reuse.
