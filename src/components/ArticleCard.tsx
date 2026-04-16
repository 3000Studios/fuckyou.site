import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "../data/types";
import { formatDate, readingTime, cx } from "../lib/utils";
import { getCategory } from "../data/categories";
import { articleWordCount } from "../data/articles";

type Props = {
  article: Article;
  variant?: "default" | "feature" | "compact" | "list";
  className?: string;
  index?: number;
};

export function ArticleCard({
  article,
  variant = "default",
  className,
  index = 0,
}: Props) {
  const cat = getCategory(article.category);
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
  const words = articleWordCount(article);

  const hero = (
    <div
      className={cx(
        "relative w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-ink-600/50",
        "bg-gradient-to-br",
        article.hero.gradient
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-7xl sm:text-8xl drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {article.hero.emoji}
        </span>
      </div>
      <div className="absolute top-3 left-3 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded">
        {article.hero.kicker}
      </div>
    </div>
  );

  if (variant === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
        className={cx("group py-5 border-b border-ink-600/60", className)}
      >
        <Link
          to={`/article/${article.slug}`}
          className="grid grid-cols-[96px_1fr] sm:grid-cols-[160px_1fr] gap-4"
        >
          <div className="rounded-lg overflow-hidden">
            <div
              className={cx(
                "aspect-[16/10] bg-gradient-to-br",
                article.hero.gradient,
                "flex items-center justify-center"
              )}
            >
              <span className="text-3xl sm:text-4xl">{article.hero.emoji}</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.16em] text-neon-red font-semibold">
              {cat?.name}
            </p>
            <h3 className="mt-1 font-display text-lg sm:text-xl font-semibold text-white leading-snug line-clamp-2 group-hover:text-neon-amber transition-colors">
              {article.title}
            </h3>
            <p className="mt-1 text-sm text-ink-200 line-clamp-2">
              {article.description}
            </p>
            <p className="mt-2 text-xs text-ink-300">
              {formatDate(article.publishedAt)} · {minutes} min read
            </p>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/article/${article.slug}`}
        className={cx(
          "group block rounded-lg p-3 hover:bg-ink-700/50 transition-colors",
          className
        )}
      >
        <p className="text-[10px] uppercase tracking-[0.16em] text-neon-red font-semibold">
          {cat?.name}
        </p>
        <h4 className="mt-0.5 font-semibold text-white leading-snug line-clamp-2 group-hover:text-neon-amber transition-colors">
          {article.title}
        </h4>
        <p className="mt-1 text-xs text-ink-300">
          {minutes} min read · {words.toLocaleString()} words
        </p>
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cx(
          "group relative rounded-2xl overflow-hidden ring-1 ring-ink-600/60 bg-ink-800",
          className
        )}
      >
        <Link to={`/article/${article.slug}`}>
          <div
            className={cx(
              "aspect-[16/10] sm:aspect-[16/8] bg-gradient-to-br",
              article.hero.gradient,
              "relative"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl sm:text-9xl drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
                {article.hero.emoji}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/30 to-transparent" />
            <div className="absolute top-4 left-4 text-xs uppercase tracking-[0.18em] font-semibold text-white bg-neon-red px-2.5 py-1 rounded">
              Featured
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-neon-red font-semibold">
              {cat?.name} · {formatDate(article.publishedAt)} · {minutes} min
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-neon-amber transition-colors">
              {article.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-100 line-clamp-3">
              {article.description}
            </p>
            <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-blue group-hover:gap-2 transition-all">
              Read the rant
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
            </p>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      className={cx(
        "group rounded-xl overflow-hidden bg-ink-800 ring-1 ring-ink-600/50 hover:ring-neon-red/60 transition-all",
        className
      )}
    >
      <Link to={`/article/${article.slug}`} className="block">
        {hero}
        <div className="p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-neon-red font-semibold">
            {cat?.name} · {minutes} min read
          </p>
          <h3 className="mt-1.5 font-display text-lg sm:text-xl font-semibold text-white leading-snug line-clamp-2 group-hover:text-neon-amber transition-colors">
            {article.title}
          </h3>
          <p className="mt-1.5 text-sm text-ink-200 line-clamp-3">
            {article.description}
          </p>
          <p className="mt-3 text-xs text-ink-300">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
