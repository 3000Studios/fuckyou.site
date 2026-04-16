import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ArticleContent } from "../components/ArticleContent";
import { ArticleCard } from "../components/ArticleCard";
import { ShareButtons } from "../components/ShareButtons";
import { AdSlot } from "../components/ads/AdSlot";
import { NewsletterForm } from "../components/NewsletterForm";
import {
  articleWordCount,
  getArticle,
  getNextPrev,
  getRelated,
} from "../data/articles";
import { getCategory } from "../data/categories";
import { formatDate, readingTime } from "../lib/utils";
import { NotFoundPage } from "./NotFoundPage";
import { SITE } from "../lib/site";

export function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  if (!article) return <NotFoundPage />;

  const cat = getCategory(article.category);
  const related = getRelated(article.slug, 3);
  const { prev, next } = getNextPrev(article.slug);
  const words = articleWordCount(article);
  const minutes = readingTime(
    article.content
      .map((b) =>
        b.type === "p" || b.type === "h2" || b.type === "h3"
          ? b.text
          : b.type === "ul" || b.type === "ol"
          ? b.items.join(" ")
          : ""
      )
      .join(" ")
  );

  return (
    <>
      <Seo
        title={article.title}
        description={article.description}
        path={`/article/${article.slug}`}
        type="article"
        article={article}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav
          aria-label="Breadcrumb"
          className="text-xs uppercase tracking-[0.18em] text-ink-300 mb-4"
        >
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-ink-400">/</span>
          {cat && (
            <>
              <Link
                to={`/category/${cat.slug}`}
                className="hover:text-white"
              >
                {cat.name}
              </Link>
              <span className="mx-2 text-ink-400">/</span>
            </>
          )}
          <span className="text-white line-clamp-1">{article.title}</span>
        </nav>

        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-neon-red">
          {cat?.name} · {minutes} min read · {words.toLocaleString()} words
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white leading-[1.05] tracking-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-ink-100">{article.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-300">
          <span>By {article.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          {article.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink-500 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ink-200"
            >
              #{t}
            </span>
          ))}
        </div>

        <div
          className={`relative mt-7 aspect-[16/8] rounded-2xl overflow-hidden ring-1 ring-ink-600/60 bg-gradient-to-br ${article.hero.gradient}`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl sm:text-9xl drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              {article.hero.emoji}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <AdSlot slot="article-top" minHeight={100} />
        </div>

        <aside className="mt-6 rounded-xl border-l-4 border-neon-red bg-ink-800/60 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neon-red">
            TL;DR
          </p>
          <p className="mt-1 text-ink-100">{article.tldr}</p>
        </aside>

        <div className="mt-8">
          <ArticleContent blocks={article.content} />
        </div>

        <div className="mt-10">
          <ShareButtons
            title={article.title}
            url={`/article/${article.slug}`}
          />
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 border border-ink-600/60 p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neon-amber">
            Subscribe to the rants
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-white">
            One email a week. Only the good ones.
          </h3>
          <p className="mt-1.5 text-sm text-ink-100">
            We'll send you the week's best rants and the occasional thing
            worth buying. That's it.
          </p>
          <div className="mt-4">
            <NewsletterForm placement="inline" />
          </div>
        </div>

        <div className="mt-10">
          <AdSlot slot="article-bottom" minHeight={250} />
        </div>

        <nav
          aria-label="Article navigation"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prev ? (
            <Link
              to={`/article/${prev.slug}`}
              className="group rounded-xl border border-ink-600 p-4 hover:border-neon-red transition-colors"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-300">
                ← Previous
              </p>
              <p className="mt-1 font-semibold text-white group-hover:text-neon-red transition-colors line-clamp-2">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/article/${next.slug}`}
              className="group rounded-xl border border-ink-600 p-4 text-right hover:border-neon-red transition-colors"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-300">
                Next →
              </p>
              <p className="mt-1 font-semibold text-white group-hover:text-neon-red transition-colors line-clamp-2">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <section
        className="border-t border-ink-600/40 bg-ink-800/30"
        aria-labelledby="related-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2
            id="related-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-white"
          >
            Related rants
          </h2>
          <p className="mt-1 text-sm text-ink-200">
            Because one was never going to be enough. Welcome to the spiral.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-ink-700 px-5 py-3 text-sm font-semibold text-white hover:bg-ink-600"
            >
              Back to all rants at {SITE.name}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
