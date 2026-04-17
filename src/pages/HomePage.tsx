import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { ArticleCard } from "../components/ArticleCard";
import { CategoryPills } from "../components/CategoryPills";
import { AdSlot } from "../components/ads/AdSlot";
import { NewsletterForm } from "../components/NewsletterForm";
import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { featured, latest, trending } from "../data/articles";
import { CATEGORIES } from "../data/categories";
import { latestOutrage } from "../data/outrage";

export function HomePage() {
  const top = featured();
  const feed = latest(12);
  const hot = trending();
  const mainFeature = top[0] || feed[0];
  const sideFeatures = (top.length > 1 ? top.slice(1, 3) : feed.slice(1, 3));

  return (
    <>
      <Seo
        title={SITE.name}
        description={SITE.description}
        path="/"
        type="website"
      />
      <Hero />

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
        aria-labelledby="games-heading"
      >
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2
              id="games-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-white"
            >
              Vent, but interactive
            </h2>
            <p className="text-sm text-ink-200">
              Three tiny machines of chaos. Play for free, keep playing with
              tokens.
            </p>
          </div>
          <Link
            to="/tokens"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-neon-amber hover:text-white"
          >
            How tokens work →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <FeatureTile
            to="/roast"
            kicker="Roast Game"
            title="Roast Me"
            body="AI-driven roast battle with a cartoon avatar that gets angrier the meaner you get. Voice input optional."
            accent="from-neon-red/30 via-ink-900 to-ink-900"
            emoji="😤"
          />
          <FeatureTile
            to="/prank"
            kicker="Prank Call"
            title="Prank Generator"
            body="Pick a scenario, personalize the details, generate a goofy fake-call audio script to share with your friends."
            accent="from-neon-blue/25 via-ink-900 to-ink-900"
            emoji="📞"
          />
          <FeatureTile
            to="/outrage"
            kicker="News"
            title="Outrage Feed"
            body="A rolling list of the small, stupid, daily things that ruin your mood. Curated rage."
            accent="from-amber-500/30 via-ink-900 to-ink-900"
            emoji="🗞️"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AdSlot slot="home-top-banner" format="horizontal" minHeight={90} />
      </section>

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        aria-labelledby="featured-heading"
      >
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="featured-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-white"
            >
              Featured rants
            </h2>
            <p className="text-sm text-ink-200">
              The big ones. The ones people keep coming back to.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-neon-blue hover:text-white"
          >
            View all
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {mainFeature && (
            <ArticleCard
              article={mainFeature}
              variant="feature"
              className="lg:col-span-2"
            />
          )}
          <div className="flex flex-col gap-5">
            {sideFeatures.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-ink-600/40 bg-ink-800/40"
        aria-labelledby="categories-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2
            id="categories-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-white"
          >
            Pick your poison
          </h2>
          <p className="mt-1 text-sm text-ink-200">
            Browse the rants by category. Some hit harder than others.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="group rounded-xl bg-ink-800 border border-ink-600 hover:border-neon-red p-4 transition-all"
              >
                <p className="font-display font-bold text-white group-hover:text-neon-red transition-colors">
                  {c.name}
                </p>
                <p className="mt-1 text-xs text-ink-200">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        aria-labelledby="latest-heading"
      >
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="latest-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-white"
            >
              Latest rants
            </h2>
            <p className="text-sm text-ink-200">
              Fresh takes. Still warm. Handle with caution.
            </p>
          </div>
          <CategoryPills className="hidden md:flex" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {feed.slice(0, 6).map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>

        <div className="my-10">
          <AdSlot
            slot="home-mid-rectangle"
            format="auto"
            minHeight={250}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {feed.slice(6).map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-ink-700 px-5 py-3 text-sm font-semibold text-white hover:bg-ink-600"
          >
            See all articles
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </section>

      <section
        className="border-y border-ink-600/40 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900"
        aria-labelledby="trending-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h2
              id="trending-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-white"
            >
              Popular this week
            </h2>
            <p className="mt-1 text-sm text-ink-200">
              The rants everyone's reading. Join them or be left out.
            </p>
            <div className="mt-6 hidden lg:block">
              <NewsletterForm placement="inline" />
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hot.map((a) => (
              <ArticleCard
                key={a.slug}
                article={a}
                variant="compact"
                className="bg-ink-800 border border-ink-600"
              />
            ))}
            <div className="sm:col-span-2 block lg:hidden mt-2">
              <NewsletterForm placement="inline" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        aria-labelledby="outrage-heading"
      >
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2
              id="outrage-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-white"
            >
              Fresh outrage
            </h2>
            <p className="text-sm text-ink-200">
              The latest small thing ruining everyone's day.
            </p>
          </div>
          <Link
            to="/outrage"
            className="text-sm font-semibold text-neon-red hover:text-white"
          >
            See the feed →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestOutrage(6).map((o) => (
            <Link
              key={o.slug}
              to={`/outrage/${o.slug}`}
              className="group block rounded-2xl overflow-hidden border border-ink-600 hover:border-neon-red/60 bg-ink-800/60"
            >
              <div
                className={`p-5 bg-gradient-to-br ${o.gradient} min-h-[140px] relative`}
              >
                <span className="absolute top-4 right-4 text-3xl" aria-hidden>
                  {o.emoji}
                </span>
                <p className="text-[11px] uppercase tracking-[0.3em] text-ink-100">
                  {o.kicker}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-neon-red transition">
                  {o.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdSlot slot="home-bottom" format="auto" minHeight={280} />
      </section>
    </>
  );
}

function FeatureTile({
  to,
  kicker,
  title,
  body,
  accent,
  emoji,
}: {
  to: string;
  kicker: string;
  title: string;
  body: string;
  accent: string;
  emoji: string;
}) {
  return (
    <Link
      to={to}
      className={`group block rounded-2xl overflow-hidden border border-ink-600 bg-gradient-to-br ${accent} p-5 hover:border-neon-red/60 transition`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink-100">
          {kicker}
        </p>
        <span className="text-3xl" aria-hidden>
          {emoji}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight group-hover:text-neon-red transition">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-100">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-blue group-hover:text-white">
        Play now →
      </span>
    </Link>
  );
}
