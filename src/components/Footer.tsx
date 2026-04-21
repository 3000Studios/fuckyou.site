import { Link } from "react-router-dom";
import { FOOTER_LINKS, SITE, NAV } from "../lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { CATEGORIES } from "../data/categories";
import { Backdrop } from "./visual/Backdrop";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ink-600/60 bg-ink-950 text-ink-100 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Backdrop className="opacity-35" intensity={0.85} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,42,85,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(41,216,255,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/10 via-ink-950/60 to-ink-950" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight">
                <span className="text-white">fuckyou</span>
                <span className="text-neon-red">.</span>
                <span className="text-ink-100">site</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-200 max-w-sm">
              {SITE.tagline} Rants, humor, and brutally honest takes about
              modern life. Updated constantly.
            </p>
            <div className="mt-5">
              <NewsletterForm placement="footer" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Sections
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ink-200 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Categories
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/category/${c.slug}`}
                    className="text-ink-200 hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ink-300">
            © {year} {SITE.name}. All rants reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {FOOTER_LINKS.map((l) => (
              <li key={l.to}>
                {l.to.startsWith("/sitemap") ? (
                  <a
                    href={l.to}
                    className="text-ink-200 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.to}
                    className="text-ink-200 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
