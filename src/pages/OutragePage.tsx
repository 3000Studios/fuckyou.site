import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Seo } from "../components/Seo";
import { AdSlot } from "../components/ads/AdSlot";
import { latestOutrage } from "../data/outrage";
import { formatDate } from "../lib/utils";

export function OutragePage() {
  const stories = latestOutrage();
  const [hero, ...rest] = stories;

  return (
    <>
      <Seo
        title="Outrage News — The Headlines Designed to Piss You Off"
        description="A rolling feed of the world's most infuriating, relatable, small-fish-big-rage stories. Updated every hour. No hot takes, just heat."
        path="/outrage"
        keywords={[
          "outrage news",
          "angry news",
          "viral rants",
          "daily outrage",
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-red-glow pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neon-red">
            Feed
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-black tracking-tight">
            News That'll Piss You Off
          </h1>
          <p className="mt-3 text-ink-100 max-w-2xl">
            A continuously refreshed list of the small, infuriating, deeply
            relatable stories from the modern world. A new one drops every
            hour. Free to read. Extremely free to be mad about.
          </p>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {hero && (
          <motion.article
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link
              to={`/outrage/${hero.slug}`}
              className="group block rounded-3xl overflow-hidden border border-ink-600 hover:border-neon-red/60 transition-colors"
            >
              <div
                className={`relative p-8 md:p-12 bg-gradient-to-br ${hero.gradient}`}
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-100">
                  <span>🔥 Hot</span>
                  <span>·</span>
                  <span>{hero.kicker}</span>
                </div>
                <h2 className="mt-3 font-display text-3xl md:text-5xl font-black tracking-tight group-hover:text-neon-red transition-colors">
                  {hero.title}
                </h2>
                <p className="mt-3 text-ink-100 max-w-3xl">{hero.description}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-ink-200">
                  <time dateTime={hero.publishedAt}>
                    {formatDate(hero.publishedAt)}
                  </time>
                  <span>·</span>
                  <span>{hero.source.name}</span>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        <AdSlot slot="outrage-top" format="horizontal" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {rest.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/outrage/${s.slug}`}
                className="group block rounded-2xl overflow-hidden border border-ink-600 hover:border-neon-red/60 bg-ink-800/60 h-full"
              >
                <div
                  className={`relative p-6 bg-gradient-to-br ${s.gradient} min-h-[180px] flex items-start`}
                >
                  <span
                    className="text-5xl absolute top-5 right-5 opacity-60"
                    aria-hidden
                  >
                    {s.emoji}
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-ink-100">
                      {s.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold tracking-tight group-hover:text-neon-red transition-colors">
                      {s.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-ink-100 line-clamp-3">
                    {s.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-ink-200">
                    <time dateTime={s.publishedAt}>
                      {formatDate(s.publishedAt)}
                    </time>
                    <span>·</span>
                    <span>{s.source.name}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 bg-ink-800/60 border border-ink-600 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Want to be mad, but quieter?
          </h2>
          <p className="mt-2 text-ink-100 max-w-2xl">
            Subscribe to the daily rant recap. One email. Six of the worst
            stories. Absolutely no hope, but lots of solidarity.
          </p>
          <Link
            to="/#newsletter"
            className="inline-block mt-4 px-4 h-11 leading-[2.75rem] rounded-xl bg-neon-red text-white font-semibold"
          >
            Sign me up
          </Link>
        </div>
      </section>
    </>
  );
}
