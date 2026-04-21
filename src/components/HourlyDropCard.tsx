import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getHourlyDrop, msUntilNextHour } from "../lib/hourly";
import { formatDate } from "../lib/utils";

function moodGradient(mood: string) {
  if (mood === "ice") return "from-neon-blue/18 via-ink-900 to-ink-950";
  if (mood === "toxic") return "from-emerald-400/14 via-ink-900 to-ink-950";
  return "from-neon-red/22 via-ink-900 to-ink-950";
}

export function HourlyDropCard() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let timer = window.setTimeout(() => setNow(new Date()), msUntilNextHour(now));
    return () => window.clearTimeout(timer);
  }, [now]);

  const drop = useMemo(() => getHourlyDrop(now), [now]);

  return (
    <Link
      to="/messages"
      className="group block rounded-3xl overflow-hidden border border-ink-600 bg-ink-800/60 hover:border-neon-red/60 hover:shadow-glow transition-all"
    >
      <div
        className={`relative p-6 sm:p-7 bg-gradient-to-br ${moodGradient(
          drop.mood
        )}`}
      >
        <p className="text-[11px] uppercase tracking-[0.26em] text-ink-100">
          Hourly Drop ·{" "}
          <time dateTime={drop.createdAt}>{formatDate(drop.createdAt)}</time>
        </p>
        <h3 className="mt-2 font-display text-xl sm:text-2xl font-black text-white group-hover:text-neon-amber transition-colors">
          {drop.title}
        </h3>
        <p className="mt-3 text-sm text-ink-100 line-clamp-3">{drop.body}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neon-blue group-hover:text-white transition-colors">
          Open messages
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path d="M5 12h14" strokeLinecap="round" />
            <path d="M13 5l7 7-7 7" strokeLinecap="round" />
          </svg>
        </p>
      </div>
    </Link>
  );
}

