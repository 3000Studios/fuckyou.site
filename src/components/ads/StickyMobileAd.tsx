import { useEffect, useState } from "react";
import { SITE } from "../../lib/site";
import { AdSlot } from "./AdSlot";
import { cx } from "../../lib/utils";

const STORAGE_KEY = "fys:sticky-ad-closed";

export function StickyMobileAd() {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const c = window.sessionStorage.getItem(STORAGE_KEY);
    if (c === "1") return;
    // Only show on small screens.
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setClosed(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function close() {
    setClosed(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (closed) return null;
  if (!SITE.adsenseClient) return null;

  return (
    <div
      className={cx(
        "fixed bottom-0 left-0 right-0 z-30 md:hidden",
        "bg-ink-900/95 border-t border-ink-600 backdrop-blur"
      )}
      role="complementary"
      aria-label="Sticky mobile advertisement"
    >
      <div className="relative pt-5">
        <button
          type="button"
          onClick={close}
          aria-label="Close advertisement"
          className="absolute top-1 right-1 h-6 w-6 inline-flex items-center justify-center rounded-full text-ink-200 hover:text-white hover:bg-ink-700"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        <AdSlot
          slot="sticky-mobile"
          format="fluid"
          minHeight={60}
          className="!my-0 !rounded-none !border-0 !border-b-0 !border-t-0"
          label="Sponsored"
        />
      </div>
    </div>
  );
}
