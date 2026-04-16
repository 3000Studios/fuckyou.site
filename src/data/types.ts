import type { CategorySlug } from "./categories";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "hr" }
  | { type: "ad"; slot: "in-article" }
  | {
      type: "affiliate";
      title: string;
      description: string;
      items: {
        name: string;
        blurb: string;
        url: string;
        tag?: string;
      }[];
    };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  tags: string[];
  publishedAt: string; // ISO date
  updatedAt?: string;
  author: string;
  hero: {
    emoji: string;
    gradient: string;
    kicker: string;
  };
  tldr: string;
  content: ArticleBlock[];
  featured?: boolean;
  trending?: boolean;
};
