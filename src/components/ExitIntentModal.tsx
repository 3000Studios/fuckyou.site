import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NewsletterForm } from "./NewsletterForm";

const STORAGE_KEY = "fys:exit-intent-dismissed";
const COOLDOWN_MS = 1000 * 60 * 60 * 24 * 3; // 3 days

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const ts = Number(raw);
      if (!Number.isNaN(ts) && Date.now() - ts < COOLDOWN_MS) return;
    }

    let shown = false;

    const onMouseOut = (e: MouseEvent) => {
      if (shown) return;
      if (e.clientY <= 0 && (!e.relatedTarget || e.relatedTarget === null)) {
        shown = true;
        setOpen(true);
      }
    };

    // Mobile fallback: show after 45s of engagement.
    const t = window.setTimeout(() => {
      if (!shown && window.matchMedia("(max-width: 768px)").matches) {
        shown = true;
        setOpen(true);
      }
    }, 45000);

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="fixed left-0 right-0 top-16 z-40 px-3 sm:px-4 pointer-events-none"
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="exit-title"
        >
          <div className="pointer-events-auto mx-auto w-full max-w-3xl rounded-2xl bg-ink-800/95 border border-ink-600 shadow-glow p-4 sm:p-5 backdrop-blur">
            <button
              type="button"
              onClick={close}
              aria-label="Close modal"
              className="absolute right-5 top-3 h-8 w-8 inline-flex items-center justify-center rounded-full text-ink-200 hover:text-white hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/70"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-4 w-4"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <div className="grid gap-3 pr-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neon-red font-semibold">
                  Before you go
                </p>
                <h2
                  id="exit-title"
                  className="mt-1 font-display text-xl sm:text-2xl font-bold text-white leading-tight"
                >
                  One email a week. Only the good rants.
                </h2>
                <p className="mt-1 text-sm text-ink-100">
                  New humor pieces, affiliate picks we actually use, and the kind
                  of takes you won't find on LinkedIn.
                </p>
              </div>
              <div className="md:w-[360px]">
                <NewsletterForm placement="exit-intent" compact onSuccess={close} />
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
