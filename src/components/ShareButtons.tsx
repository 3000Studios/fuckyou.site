import { useEffect, useState } from "react";
import { SITE } from "../lib/site";
import { track } from "../lib/analytics";
import { cx } from "../lib/utils";

type Props = {
  title: string;
  url: string;
  className?: string;
};

export function ShareButtons({ title, url, className }: Props) {
  const fullUrl = url.startsWith("http") ? url : `${SITE.url}${url}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const shares: { label: string; href: string; icon: JSX.Element }[] = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(fullUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 3H22l-7.5 8.6L23 21h-6.7l-5.2-6.8L5 21H2l8-9.2L1.6 3h6.9l4.7 6.2L18.9 3Zm-1.1 16h1.8L7.4 5h-2l12.4 14Z"
          />
        </svg>
      ),
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        fullUrl
      )}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-1.8 2-1.8h2V2.1C16.6 2 15.5 2 14.3 2 11.9 2 10 3.5 10 6.9V10H7v4h3v8h3Z"
          />
        </svg>
      ),
    },
    {
      label: "Share via Reddit",
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(
        fullUrl
      )}&title=${encodeURIComponent(title)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M22 12a2 2 0 0 0-3.4-1.4 10 10 0 0 0-5.2-1.5l.9-4 2.8.6a1.6 1.6 0 1 0 .2-1l-3.4-.7-1.1 5a10 10 0 0 0-5.4 1.5A2 2 0 1 0 4 13.3c0 3.3 3.6 6 8 6s8-2.7 8-6a2 2 0 0 0 2-1.3Zm-12 2a1.3 1.3 0 1 1 2.6 0 1.3 1.3 0 0 1-2.6 0Zm7.4 3.4a4.7 4.7 0 0 1-5.4 0 .6.6 0 1 1 .7-.9 3.5 3.5 0 0 0 4 0 .6.6 0 1 1 .7.9Zm-.7-2.1a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"
          />
        </svg>
      ),
    },
    {
      label: "Share via Email",
      href: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(`${title}\n\n${fullUrl}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.7-8 5-8-5V6l8 5 8-5v2.7Z"
          />
        </svg>
      ),
    },
  ];

  function copy() {
    try {
      void navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      track({ name: "share", params: { method: "copy", url: fullUrl } });
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cx(
        "flex flex-wrap items-center gap-2",
        className
      )}
      aria-label="Share this article"
    >
      <span className="text-xs uppercase tracking-widest text-ink-300 mr-1">
        Share
      </span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          onClick={() =>
            track({
              name: "share",
              params: { method: s.label, url: fullUrl },
            })
          }
          className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-ink-700 text-ink-100 hover:text-white hover:bg-neon-red transition-colors"
        >
          {s.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-ink-700 text-ink-100 hover:text-white hover:bg-neon-blue text-xs font-semibold transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
