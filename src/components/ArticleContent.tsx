import type { ArticleBlock } from "../data/types";
import { AdSlot } from "./ads/AdSlot";
import { AffiliateBlock } from "./AffiliateBlock";

export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-rant">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(b.text)}>
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i}>
                {b.text}
                {b.cite ? (
                  <footer className="mt-1 text-xs text-ink-300">
                    — {b.cite}
                  </footer>
                ) : null}
              </blockquote>
            );
          case "hr":
            return <hr key={i} />;
          case "ad":
            return (
              <AdSlot
                key={i}
                slot="in-article"
                format="fluid"
                layout="in-article"
                minHeight={160}
                className="my-8"
              />
            );
          case "affiliate":
            return <AffiliateBlock key={i} {...b} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
