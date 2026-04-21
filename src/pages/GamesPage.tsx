import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { cx } from "../lib/utils";

type Cell = { text: string; on: boolean };

function makeBoard(seed: number): Cell[] {
  const phrases = [
    "Unexpected item in bagging area",
    "Two-factor code never arrives",
    "App update moved everything",
    "Printer is 'offline' (lying)",
    "Meeting that could be an email",
    "Subscription to a button",
    "Hold music for 38 minutes",
    "Mic 'unmuted' moment",
    "Wi‑Fi drops at 99%",
    "Autocorrect chooses violence",
    "Calendar double-booked you",
    "Login requires a captcha (again)",
    "Package says delivered (it isn't)",
    "Your 'free trial' ends today",
    "Password rules changed mid-login",
    "Someone replies with just “K”",
    "The elevator stops at every floor",
    "Traffic because 'rubbernecking'",
    "The toaster burns one side only",
    "Laptop fan sounds like takeoff",
    "Your phone updates at 2AM",
    "The QR code menu is blurry",
    "A form resets on submit",
    "“We’re experiencing high volume”",
    "Bluetooth pairs with the wrong thing",
  ];

  function rand(n: number) {
    let x = Math.sin(n + seed) * 10000;
    return x - Math.floor(x);
  }

  const picked: string[] = [];
  while (picked.length < 25) {
    const idx = Math.floor(rand(picked.length * 13) * phrases.length);
    const p = phrases[idx];
    if (!picked.includes(p)) picked.push(p);
  }
  picked[12] = "FREE SPACE: you survived today";
  return picked.map((text) => ({ text, on: false }));
}

function hasBingo(board: Cell[]): boolean {
  const on = (i: number) => board[i]?.on;
  for (let r = 0; r < 5; r += 1) {
    let ok = true;
    for (let c = 0; c < 5; c += 1) ok = ok && on(r * 5 + c);
    if (ok) return true;
  }
  for (let c = 0; c < 5; c += 1) {
    let ok = true;
    for (let r = 0; r < 5; r += 1) ok = ok && on(r * 5 + c);
    if (ok) return true;
  }
  let d1 = true;
  let d2 = true;
  for (let i = 0; i < 5; i += 1) {
    d1 = d1 && on(i * 6);
    d2 = d2 && on((i + 1) * 4);
  }
  return d1 || d2;
}

export function GamesPage() {
  const [mature, setMature] = useState(false);
  const [seed, setSeed] = useState(() => Math.floor(Date.now() / 86400000));
  const [board, setBoard] = useState<Cell[]>(() => makeBoard(seed));

  const bingo = useMemo(() => hasBingo(board), [board]);

  return (
    <>
      <Seo
        title="Games"
        description={`Games, toys, and rage relief on ${SITE.name}.`}
        path="/games"
        keywords={["games", "roast", "prank", "bingo"]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-red">
          Play
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
          Games (with adult energy)
        </h1>
        <p className="mt-3 max-w-2xl text-ink-100">
          “Adult-themed” here means mature humor and real-world rage. No porn.
          No explicit sexual content. We’re trying to get paid by advertisers,
          not banished to the shadow realm.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/60 px-4 py-2 text-sm text-ink-100">
            <input
              type="checkbox"
              checked={mature}
              onChange={(e) => setMature(e.target.checked)}
            />
            Mature mode (stronger language)
          </label>
          <Link
            to="/subscribe"
            className="inline-flex items-center gap-2 rounded-xl bg-neon-red px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            Subscribe for more
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
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link
            to="/roast"
            className="group rounded-3xl border border-ink-600 bg-ink-800/60 hover:border-neon-red/60 hover:shadow-glow transition-all p-6"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-ink-200">
              Game
            </p>
            <h2 className="mt-2 font-display text-2xl font-black text-white group-hover:text-neon-amber transition-colors">
              Roast Battle
            </h2>
            <p className="mt-2 text-sm text-ink-100">
              Get verbally obliterated in a safe, funny way.
            </p>
          </Link>

          <Link
            to="/prank"
            className="group rounded-3xl border border-ink-600 bg-ink-800/60 hover:border-neon-red/60 hover:shadow-glow transition-all p-6"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-ink-200">
              Game
            </p>
            <h2 className="mt-2 font-display text-2xl font-black text-white group-hover:text-neon-amber transition-colors">
              Prank Script Generator
            </h2>
            <p className="mt-2 text-sm text-ink-100">
              Generate a script, hit play, and laugh in private.
            </p>
          </Link>

          <div className="rounded-3xl border border-ink-600 bg-ink-800/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-200">
              Mini
            </p>
            <h2 className="mt-2 font-display text-2xl font-black text-white">
              Rage Bingo
            </h2>
            <p className="mt-2 text-sm text-ink-100">
              Click the squares you lived today. Get a line. Claim a victory.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const nextSeed = seed + 1;
                  setSeed(nextSeed);
                  setBoard(makeBoard(nextSeed));
                }}
                className="rounded-lg bg-ink-700 px-3 py-2 text-sm font-semibold text-white hover:bg-ink-600"
              >
                New board
              </button>
              <button
                type="button"
                onClick={() => setBoard((b) => b.map((c) => ({ ...c, on: false })))}
                className="rounded-lg bg-ink-900/40 px-3 py-2 text-sm font-semibold text-white hover:bg-ink-900"
              >
                Reset
              </button>
            </div>
            {bingo && (
              <div className="mt-4 rounded-xl border border-neon-red/40 bg-neon-red/10 p-3 text-sm text-white">
                Bingo. You win a deep breath.{" "}
                {mature ? "Also: everything is still stupid." : "Also: good luck."}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-ink-600 bg-ink-800/60 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-black text-white">
                Rage Bingo Board
              </h2>
              <p className="mt-2 text-sm text-ink-100">
                Tip: the center is free, because you woke up and that counts.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-200">Status</p>
              <p
                className={cx(
                  "mt-1 text-sm font-semibold",
                  bingo ? "text-neon-red" : "text-ink-100"
                )}
              >
                {bingo ? "BINGO" : "in progress"}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {board.map((cell, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  setBoard((b) => {
                    const next = [...b];
                    next[idx] = { ...next[idx], on: !next[idx].on };
                    return next;
                  })
                }
                className={cx(
                  "rounded-xl border px-2 py-3 text-[11px] sm:text-xs leading-snug text-left transition",
                  cell.on
                    ? "border-neon-red/60 bg-neon-red/15 text-white"
                    : "border-ink-600 bg-ink-900/30 text-ink-100 hover:border-neon-blue/50"
                )}
              >
                {cell.text}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

