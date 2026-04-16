import { track } from "../lib/analytics";

type Props = {
  title: string;
  description: string;
  items: {
    name: string;
    blurb: string;
    url: string;
    tag?: string;
  }[];
};

export function AffiliateBlock({ title, description, items }: Props) {
  return (
    <section
      aria-label={`Affiliate recommendations: ${title}`}
      className="not-prose my-10 rounded-2xl border border-ink-600/60 bg-gradient-to-br from-ink-800 to-ink-900 p-5 sm:p-6"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neon-amber">
        Affiliate Picks
      </p>
      <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-ink-100">{description}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((it) => (
          <a
            key={it.name}
            href={it.url}
            target="_blank"
            rel="nofollow sponsored noopener"
            onClick={() =>
              track({
                name: "affiliate_click",
                params: { name: it.name, url: it.url, tag: it.tag },
              })
            }
            className="group block rounded-xl bg-ink-700/40 hover:bg-ink-700 border border-ink-600/70 hover:border-neon-red/60 p-4 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-white leading-tight">
                {it.name}
              </h4>
              {it.tag && (
                <span className="shrink-0 text-[10px] uppercase tracking-widest font-semibold text-neon-blue bg-neon-blue/10 border border-neon-blue/30 rounded px-1.5 py-0.5">
                  {it.tag}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-ink-200">{it.blurb}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-neon-red group-hover:gap-2 transition-all">
              Check price
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M10 7h7v7" strokeLinecap="round" />
              </svg>
            </p>
          </a>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-ink-300">
        Some links on this page are affiliate links. We may earn a small
        commission at no extra cost to you — it helps keep the rants going.
      </p>
    </section>
  );
}
