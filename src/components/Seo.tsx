import { Helmet } from "react-helmet-async";
import { SITE } from "../lib/site";
import type { Article } from "../data/types";
import { absoluteUrl } from "../lib/utils";

type Props = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  article?: Article;
  noindex?: boolean;
  keywords?: string[];
};

export function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  article,
  noindex,
  keywords,
}: Props) {
  const fullTitle =
    title === SITE.name ? title : `${title} — ${SITE.name}`;
  const url = absoluteUrl(path, SITE.url);
  const ogImage = image || absoluteUrl("/og.svg", SITE.url);
  const desc = description || SITE.description;

  const structured = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        author: {
          "@type": "Organization",
          name: article.author,
          url: SITE.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        image: [ogImage],
        articleSection: article.category,
        keywords: article.tags.join(", "),
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        />
      )}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(structured)}</script>
    </Helmet>
  );
}
