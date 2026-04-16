import type { Article } from "./types";
import { article as a1 } from "./articles/quit-your-job";
import { article as a2 } from "./articles/why-everything-breaks";
import { article as a3 } from "./articles/real-cost-of-being-broke";
import { article as a4 } from "./articles/tech-that-drives-crazy";
import { article as a5 } from "./articles/mondays-feel-illegal";
import { article as a6 } from "./articles/reply-k-should-be-studied";
import { article as a7 } from "./articles/nothing-loads-in-a-hurry";
import { article as a8 } from "./articles/silent-rage-slow-wifi";
import { article as a9 } from "./articles/customer-service-boss-fight";
import { article as a10 } from "./articles/things-that-ruin-your-mood";

export const ARTICLES: Article[] = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];

export const ARTICLES_BY_SLUG: Record<string, Article> = ARTICLES.reduce(
  (acc, a) => {
    acc[a.slug] = a;
    return acc;
  },
  {} as Record<string, Article>
);

export const getArticle = (slug: string): Article | undefined =>
  ARTICLES_BY_SLUG[slug];

export const getArticlesByCategory = (cat: string): Article[] =>
  ARTICLES.filter((a) => a.category === cat).sort(byDateDesc);

export const featured = (): Article[] =>
  ARTICLES.filter((a) => a.featured).sort(byDateDesc);

export const trending = (): Article[] =>
  ARTICLES.filter((a) => a.trending).sort(byDateDesc);

export const latest = (limit?: number): Article[] => {
  const sorted = [...ARTICLES].sort(byDateDesc);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
};

export const getRelated = (slug: string, limit = 3): Article[] => {
  const current = getArticle(slug);
  if (!current) return [];
  const sameCat = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category
  );
  const others = ARTICLES.filter(
    (a) => a.slug !== slug && a.category !== current.category
  );
  return [...sameCat, ...others].sort(byDateDesc).slice(0, limit);
};

export const getNextPrev = (
  slug: string
): { next: Article | null; prev: Article | null } => {
  const sorted = [...ARTICLES].sort(byDateDesc);
  const idx = sorted.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
};

function byDateDesc(a: Article, b: Article): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function articleWordCount(a: Article): number {
  return a.content.reduce((n, b) => {
    if (b.type === "p" || b.type === "h2" || b.type === "h3") {
      return n + b.text.split(/\s+/).length;
    }
    if (b.type === "ul" || b.type === "ol") {
      return n + b.items.join(" ").split(/\s+/).length;
    }
    if (b.type === "quote") return n + b.text.split(/\s+/).length;
    if (b.type === "affiliate") {
      return (
        n +
        b.title.split(/\s+/).length +
        b.description.split(/\s+/).length +
        b.items.reduce((m, it) => m + it.blurb.split(/\s+/).length, 0)
      );
    }
    return n;
  }, 0);
}
