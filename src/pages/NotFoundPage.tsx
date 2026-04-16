import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ArticleCard } from "../components/ArticleCard";
import { latest } from "../data/articles";

export function NotFoundPage() {
  const suggestions = latest(3);
  return (
    <>
      <Seo
        title="404 — Page Not Found"
        description="This page doesn't exist. Many do, though."
        path="/404"
        noindex
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-bold text-white">
          This page? Not here.
        </h1>
        <p className="mt-4 text-ink-100">
          It was deleted, renamed, or it never existed. You're going to be
          fine. We promise. Here's what to read instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-neon-red px-5 py-3 text-sm font-semibold text-white hover:bg-neon-red/90"
          >
            Back to home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-500 px-5 py-3 text-sm font-semibold text-white hover:border-neon-blue hover:text-neon-blue"
          >
            Browse all rants
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl font-bold text-white">
          While you're here
        </h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {suggestions.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
