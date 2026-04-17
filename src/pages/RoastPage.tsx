import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Seo } from "../components/Seo";
import { AngryAvatar } from "../components/AngryAvatar";
import { AdSlot } from "../components/ads/AdSlot";
import { TokenBadge } from "../components/TokenBadge";
import {
  angerFromInput,
  pickRoast,
  TIER_COLORS,
  TIER_LABELS,
  type RoastTier,
} from "../lib/roasts";
import { FEATURE_COSTS, tokens, type Wallet } from "../lib/tokens";
import { track } from "../lib/analytics";
import { cx } from "../lib/utils";

type Turn = { id: number; from: "you" | "bot"; text: string; tier: RoastTier };

export function RoastPage() {
  const [wallet, setWallet] = useState<Wallet>(() => tokens.get());
  const [tier, setTier] = useState<RoastTier>(0);
  const [turns, setTurns] = useState<Turn[]>([
    {
      id: 0,
      from: "bot",
      text: "Oh. It's you. Say something. I'll wait. But only out of habit.",
      tier: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const seenRef = useRef<Set<string>>(new Set());
  const logRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => tokens.subscribe(setWallet), []);

  const sttSupported = useMemo(
    () =>
      typeof window !== "undefined" &&
      !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    []
  );
  useEffect(() => {
    if (!logRef.current) return;
    logRef.current.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns.length]);

  const sendToBot = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (!tokens.spend(FEATURE_COSTS.roast, "roast_turn")) {
        track({ name: "roast_no_tokens" });
        return;
      }

      setTurns((prev) => [
        ...prev,
        { id: prev.length, from: "you", text: trimmed, tier },
      ]);

      const anger = angerFromInput(trimmed);
      const nextTierVal = Math.min(
        4,
        Math.max(tier, Math.floor((tier * 2 + anger) / 2))
      ) as RoastTier;
      setTier(nextTierVal);

      const { text: roast } = pickRoast(nextTierVal, seenRef.current);
      seenRef.current.add(roast);

      window.setTimeout(() => {
        setTurns((prev) => [
          ...prev,
          { id: prev.length, from: "bot", text: roast, tier: nextTierVal },
        ]);
        track({
          name: "roast_turn",
          params: { tier: nextTierVal, anger },
        });
      }, 320);
    },
    [tier]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToBot(input);
    setInput("");
  };

  const startListening = () => {
    if (!sttSupported) return;
    const SR: typeof SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (ev: SpeechRecognitionEvent) => {
      const transcript = Array.from(ev.results)
        .map((r) => r[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) sendToBot(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };
  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const reset = () => {
    setTier(0);
    setTurns([
      {
        id: 0,
        from: "bot",
        text: "Fine. Fresh start. Still mad though.",
        tier: 0,
      },
    ]);
    seenRef.current = new Set();
  };

  const canAffordTurn = wallet.balance >= FEATURE_COSTS.roast;

  return (
    <>
      <Seo
        title="Roast Mode — Let the AI Cook You"
        description="Play the roast battle game. Speak or type. The angrier you make it, the harder it goes. Cartoon animated, tokens-per-turn, zero therapy involved."
        path="/roast"
        keywords={["roast game", "ai roast", "roast me", "insult generator"]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-red-glow pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neon-red">
                Game Mode
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-display font-black tracking-tight">
                Roast Me
              </h1>
              <p className="mt-2 text-ink-100 max-w-xl">
                Say anything. The AI starts mildly annoyed and escalates with
                every reply. Try to hit <span className="text-neon-red font-semibold">Apocalyptic</span> without
                crying.
              </p>
            </div>
            <TokenBadge />
          </div>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <div className="bg-ink-800/60 border border-ink-600 rounded-2xl p-5 h-fit sticky top-20">
            <AngryAvatar tier={tier} speaking={false} />
            <div className="mt-4 text-center">
              <span
                className={cx(
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                  TIER_COLORS[tier]
                )}
              >
                Tier {tier} — {TIER_LABELS[tier]}
              </span>
            </div>
            <div className="mt-4">
              <div className="h-1.5 w-full rounded-full bg-ink-600 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-neon-red to-fuchsia-500 transition-all"
                  style={{ width: `${(tier / 4) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-200">
                Escalation meter. Higher = meaner. Cheating = keep using ALL CAPS.
              </p>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={reset}
                className="flex-1 h-9 rounded-lg bg-ink-700 hover:bg-ink-600 text-sm font-medium"
              >
                Reset
              </button>
            </div>
            <p className="mt-4 text-[11px] text-ink-300 leading-relaxed">
              {FEATURE_COSTS.roast} token per turn. Free daily tokens refill
              every day. {sttSupported ? "Voice input is supported." : "Voice input unavailable in this browser."}
            </p>
          </div>

          <div className="bg-ink-800/60 border border-ink-600 rounded-2xl flex flex-col min-h-[520px] overflow-hidden">
            <div
              ref={logRef}
              className="flex-1 p-5 space-y-3 overflow-y-auto max-h-[55vh]"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {turns.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cx(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                      t.from === "you"
                        ? "ml-auto bg-neon-blue/15 text-neon-blue border border-neon-blue/30"
                        : "mr-auto bg-ink-700 border border-ink-500"
                    )}
                  >
                    {t.from === "bot" ? (
                      <span
                        className={cx(
                          "block text-[10px] uppercase tracking-wider mb-1",
                          t.tier >= 3 ? "text-neon-red" : "text-ink-200"
                        )}
                      >
                        Bot · {TIER_LABELS[t.tier]}
                      </span>
                    ) : (
                      <span className="block text-[10px] uppercase tracking-wider text-ink-200 mb-1">
                        You
                      </span>
                    )}
                    {t.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-ink-600 p-3 flex gap-2 items-center"
            >
              <button
                type="button"
                onClick={listening ? stopListening : startListening}
                disabled={!sttSupported}
                className={cx(
                  "h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0",
                  listening
                    ? "bg-neon-red text-white animate-pulse"
                    : "bg-ink-700 hover:bg-ink-600 disabled:opacity-40"
                )}
                aria-label={listening ? "Stop voice input" : "Start voice input"}
                title={sttSupported ? "Hold nothing, speak your piece" : "Voice not supported in this browser"}
              >
                <MicIcon />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say something. Anything. Swing."
                aria-label="Message the roast bot"
                className="flex-1 h-11 bg-ink-900 border border-ink-600 rounded-xl px-3 text-sm placeholder:text-ink-300 focus:outline-none focus:border-neon-red"
              />
              <button
                type="submit"
                disabled={!canAffordTurn || !input.trim()}
                className="h-11 px-4 rounded-xl bg-neon-red text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send · {FEATURE_COSTS.roast}
              </button>
            </form>
            {!canAffordTurn && (
              <div className="px-5 py-3 bg-amber-500/10 border-t border-amber-500/30 text-sm flex items-center justify-between gap-3">
                <span>
                  Out of tokens. Free tokens refill tomorrow, or grab more now.
                </span>
                <Link
                  to="/tokens"
                  className="px-3 h-9 inline-flex items-center rounded-lg bg-neon-amber text-ink-950 text-xs font-bold"
                >
                  Get tokens
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="my-10">
          <AdSlot slot="in-article" layout="horizontal" />
        </div>

        <section className="mt-8 prose prose-invert max-w-none">
          <h2>How this works</h2>
          <p>
            Type or talk. The bot starts mildly annoyed (Tier 0) and escalates
            all the way to Apocalyptic (Tier 4). ALL CAPS, aggressive
            punctuation, and trigger words make it go faster. No one is getting
            targeted but you, because you asked for it.
          </p>
          <h2>Why it costs tokens</h2>
          <p>
            Tokens keep bots away, keep the free daily supply generous, and let
            heavy users fund the servers without ads in your face 24/7. You get
            10 free tokens per day. Each roast turn costs 1.
          </p>
        </section>
      </section>
    </>
  );
}

function MicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
    </svg>
  );
}
