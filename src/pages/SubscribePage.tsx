import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { getSubscriptionLinks } from "../lib/payments";

export function SubscribePage() {
  const links = getSubscriptionLinks();

  return (
    <>
      <Seo
        title="Subscribe"
        description={`Support ${SITE.name} and unlock extra drops, games, and the daily recap.`}
        path="/subscribe"
        keywords={["subscribe", "paypal", "stripe", "support"]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-red">
          Support
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
          Subscribe
        </h1>
        <p className="mt-3 text-ink-100 max-w-2xl">
          You’re funding new rants, new wallpapers, and better games. You’re
          also funding my continued refusal to pretend everything is fine.
        </p>

        <div className="mt-8 rounded-3xl border border-ink-600 bg-ink-800/60 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-white">
            What you get
          </h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-ink-100">
            <li className="rounded-xl border border-ink-600 bg-ink-900/40 p-4">
              Hourly drops + message center
            </li>
            <li className="rounded-xl border border-ink-600 bg-ink-900/40 p-4">
              Extra games + mature humor pack
            </li>
            <li className="rounded-xl border border-ink-600 bg-ink-900/40 p-4">
              Video wallpapers that rotate
            </li>
            <li className="rounded-xl border border-ink-600 bg-ink-900/40 p-4">
              Fewer compromises, more chaos
            </li>
          </ul>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {links.length === 0 ? (
              <div className="sm:col-span-2 text-sm text-ink-200">
                Payment links are not configured yet.
              </div>
            ) : (
              links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-ink-600 bg-ink-900/40 hover:border-neon-red/60 hover:shadow-glow transition-all p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink-200">
                    {l.provider}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-white group-hover:text-neon-amber transition-colors">
                    {l.label}
                  </p>
                  <p className="mt-2 text-sm text-ink-100">
                    Opens a secure checkout in a new tab.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neon-blue group-hover:text-white transition-colors">
                    Continue
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" strokeLinecap="round" />
                      <path d="M13 5l7 7-7 7" strokeLinecap="round" />
                    </svg>
                  </p>
                </a>
              ))
            )}
          </div>

          <p className="mt-6 text-xs text-ink-200">
            By subscribing, you agree to the Terms. Subscriptions are handled by
            PayPal/Stripe; billing details are managed there.
          </p>
        </div>
      </section>
    </>
  );
}

