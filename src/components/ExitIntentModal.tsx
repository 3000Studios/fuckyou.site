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
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full sm:max-w-md rounded-2xl bg-ink-800 border border-ink-600 shadow-glow p-5 sm:p-6"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close modal"
              className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full text-ink-200 hover:text-white hover:bg-ink-700"
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
            <p className="text-xs uppercase tracking-[0.18em] text-neon-red font-semibold">
              Before you go
            </p>
            <h2
              id="exit-title"
              className="mt-2 font-display text-2xl font-bold text-white leading-tight"
            >
              One email a week. Only the good rants.
            </h2>
            <p className="mt-2 text-sm text-ink-100">
              New humor pieces, affiliate picks we actually use, and the kind
              of takes you won't find on LinkedIn. No spam, no nonsense, no
              'just circling back.'
            </p>
            <div className="mt-4">
              <NewsletterForm placement="exit-intent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
