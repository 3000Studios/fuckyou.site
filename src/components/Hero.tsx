import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-ink-600/50"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-red-glow pointer-events-none" />
      <div className="absolute inset-0 bg-blue-glow pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold text-neon-red"
        >
          The Rant Desk · updated this week
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight"
        >
          Everything is fine.
          <br className="hidden sm:block" /> <span className="underline-neon">Absolutely nothing is fine.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-5 max-w-2xl text-lg sm:text-xl text-ink-100"
        >
          Viral rants, relatable humor, and the unfiltered take on modern
          life. Read one. Share one. Forward one to your group chat at 2am.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-7 flex flex-wrap gap-3"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-neon-red px-5 py-3 text-sm font-semibold text-white hover:bg-neon-red/90 shadow-glow"
          >
            Browse the rants
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
          </Link>
          <Link
            to="/category/life"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-500 bg-ink-800/60 px-5 py-3 text-sm font-semibold text-white hover:border-neon-blue hover:text-neon-blue transition-colors"
          >
            Start with Life
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
