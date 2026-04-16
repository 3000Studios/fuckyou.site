import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ArticleCard } from "../components/ArticleCard";
import { CategoryPills } from "../components/CategoryPills";
import { AdSlot } from "../components/ads/AdSlot";
import { latest } from "../data/articles";
import { SITE } from "../lib/site";

const PAGE_SIZE = 6;

export function BlogPage() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [page, setPage] = useState(1);

  const all = latest();
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return all;
    return all.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query))
    );
  }, [q, all]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageItems = results.slice(0, page * PAGE_SIZE);

  return (
    <>
      <Seo
        title="All Rants"
        description={`The full archive of rants, humor, and takes on modern life from ${SITE.name}. Browse, search, and rage.`}
        path="/blog"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-ink-600/40">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-neon-red">
          The Archive
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white">
          Every rant. One page.
        </h1>
        <p className="mt-3 max-w-2xl text-ink-100">
          Search, filter, and fall down a rabbit hole. You're welcome.
        </p>

        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
          <label htmlFor="blog-search" className="sr-only">
            Search rants
          </label>
          <div className="relative flex-1">
            <input
              id="blog-search"
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
                const next = new URLSearchParams(params);
                if (e.target.value) next.set("q", e.target.value);
                else next.delete("q");
                setParams(next, { replace: true });
              }}
              placeholder="Search rants by topic, tag, or feeling…"
              className="w-full bg-ink-800 border border-ink-600 focus:border-neon-red focus:outline-none rounded-lg pl-10 pr-3 py-3 text-sm text-white placeholder:text-ink-300"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </div>
          <CategoryPills />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSlot slot="blog-top" minHeight={90} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {pageItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-ink-100">
              Nothing here. Even our archive judges you a little.
            </p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setParams({}, { replace: true });
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-neon-red px-4 py-2 text-sm font-semibold text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageItems.map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i} />
              ))}
            </div>

            {page < totalPages && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 rounded-lg bg-ink-700 px-5 py-3 text-sm font-semibold text-white hover:bg-ink-600"
                >
                  Load more rants
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
