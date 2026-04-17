import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Seo } from "../components/Seo";
import { TokenBadge } from "../components/TokenBadge";
import { AdSlot } from "../components/ads/AdSlot";
import {
  PRANK_SCENARIOS,
  getPrankScenario,
  type PrankScenario,
} from "../lib/pranks";
import { FEATURE_COSTS, tokens, type Wallet } from "../lib/tokens";
import { track } from "../lib/analytics";
import { cx } from "../lib/utils";

type Playback = {
  lines: { speaker: string; text: string; pause?: number }[];
  index: number;
  playing: boolean;
};

export function PrankPage() {
  const [wallet, setWallet] = useState<Wallet>(() => tokens.get());
  const [selected, setSelected] = useState<PrankScenario>(PRANK_SCENARIOS[0]!);
  const [name, setName] = useState("Your friend");
  const [topic, setTopic] = useState("their mystery haircut");
  const [city, setCity] = useState("Toledo");
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => tokens.subscribe(setWallet), []);

  const scenarioLines = useMemo(
    () => selected.lines({ name, topic, city }),
    [selected, name, topic, city]
  );

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const q = new URLSearchParams({
      s: selected.id,
      n: name,
      t: topic,
      c: city,
    });
    return `${window.location.origin}/prank?${q.toString()}`;
  }, [selected.id, name, topic, city]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const sid = url.searchParams.get("s");
    if (sid) {
      const s = getPrankScenario(sid);
      if (s) {
        setSelected(s);
        setName(url.searchParams.get("n") || "Your friend");
        setTopic(url.searchParams.get("t") || "their mystery haircut");
        setCity(url.searchParams.get("c") || "Toledo");
      }
    }
  }, []);

  const generate = () => {
    if (!tokens.spend(FEATURE_COSTS.prank_generate, "prank_generate")) {
      track({ name: "prank_no_tokens" });
      return;
    }
    track({ name: "prank_generate", params: { scenario: selected.id } });
    setPlayback({ lines: scenarioLines, index: 0, playing: true });
  };

  useEffect(() => {
    if (!playback || !playback.playing) return;
    const line = playback.lines[playback.index];
    if (!line) {
      setPlayback((p) => (p ? { ...p, playing: false } : p));
      return;
    }

    const timer = window.setTimeout(() => {
      setPlayback((p) =>
        p ? { ...p, index: p.index + 1, playing: true } : p
      );
    }, line.pause ?? 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [playback]);

  const stop = () => {
    setPlayback(null);
  };

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      track({ name: "prank_share", params: { scenario: selected.id } });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const canAfford = wallet.balance >= FEATURE_COSTS.prank_generate;

  return (
    <>
      <Seo
        title="Prank Call Generator — Build Fake Calls for Your Friends"
        description="Pick a scenario, generate a goofy fake-call conversation script, and share a link. Policy-safe, Twilio-free, no real phones harassed, 100% vibes."
        path="/prank"
        keywords={[
          "prank call generator",
          "fake call",
          "prank script",
          "funny call",
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-glow pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neon-blue">
                Game Mode
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-display font-black tracking-tight">
                Prank Call Generator
              </h1>
              <p className="mt-2 text-ink-100 max-w-xl">
                Pick a scenario, plug in their name, hit Generate. The site
                runs a prebuilt human conversation script with live timing. Share
                the link and let them read the fake call exchange in sequence.
              </p>
              <p className="mt-2 text-xs text-ink-300">
                No real phone numbers are dialed. This is a parody
                generator. Your Twilio-using competitors are getting banned —
                you're not.
              </p>
            </div>
            <TokenBadge />
          </div>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div>
            <div className="bg-ink-800/60 border border-ink-600 rounded-2xl p-5">
              <h2 className="font-display text-lg font-bold mb-3">
                Pick your chaos
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {PRANK_SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={cx(
                      "text-left p-3 rounded-xl border transition-colors",
                      selected.id === s.id
                        ? "border-neon-blue bg-neon-blue/10"
                        : "border-ink-600 bg-ink-900 hover:border-ink-400"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{s.emoji}</span>
                      <span className="font-semibold">{s.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-100 line-clamp-2">
                      {s.tagline}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-200">
                      <span>{"🔥".repeat(s.intensity)}</span>
                      <span>· {s.tokens} tokens</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 bg-ink-800/60 border border-ink-600 rounded-2xl p-5">
              <h2 className="font-display text-lg font-bold mb-3">
                Personalize the call
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field
                  label="Victim's name"
                  value={name}
                  onChange={setName}
                  placeholder="Dave, Karen, etc."
                />
                <Field
                  label="Topic / detail"
                  value={topic}
                  onChange={setTopic}
                  placeholder="The thing they did"
                />
                <Field
                  label="Their city"
                  value={city}
                  onChange={setCity}
                  placeholder="Toledo"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={generate}
                  disabled={!canAfford}
                  className="px-4 h-11 rounded-xl bg-neon-blue text-ink-950 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {playback?.playing ? "Playing…" : `Generate · ${selected.tokens} tokens`}
                </button>
                {playback && (
                  <button
                    onClick={stop}
                    className="px-4 h-11 rounded-xl bg-ink-700 hover:bg-ink-600 text-sm font-medium"
                  >
                    Stop
                  </button>
                )}
                <button
                  onClick={copyShare}
                  className="px-4 h-11 rounded-xl bg-ink-700 hover:bg-ink-600 text-sm font-medium"
                >
                  {copied ? "Link copied" : "Copy share link"}
                </button>
              </div>

              {!canAfford && (
                <p className="mt-3 text-sm text-amber-300">
                  Out of tokens. <Link to="/tokens" className="underline">Get more</Link>.
                </p>
              )}
            </div>

            <div className="mt-5 bg-ink-800/60 border border-ink-600 rounded-2xl p-5">
              <h2 className="font-display text-lg font-bold mb-3">Script</h2>
              <div className="space-y-2">
                {scenarioLines.map((l, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor:
                        playback && playback.index === i && playback.playing
                          ? "rgba(41,216,255,0.1)"
                          : "rgba(0,0,0,0)",
                    }}
                    className={cx(
                      "p-3 rounded-lg border",
                      playback && playback.index === i && playback.playing
                        ? "border-neon-blue"
                        : "border-ink-600"
                    )}
                  >
                    <span className="text-[10px] uppercase tracking-wider text-ink-200">
                      {l.speaker}
                    </span>
                    <p className="text-sm mt-0.5">{l.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="my-8">
              <AdSlot slot="prank-mid" format="horizontal" />
            </div>

            <section className="prose prose-invert max-w-none">
              <h2>How the Prank Call Generator works</h2>
              <p>
                You pick a scenario, personalize the name and topic, and the
                site runs a prewritten, human-style conversation script in a
                timed chat format. Nothing gets dialed. Nothing gets mass-texted.
                You share the link and your friend watches the script play out.
              </p>
              <h2>Why not real phone calls?</h2>
              <p>
                Two reasons: (1) Twilio and every other phone provider bans
                outbound prank calling in their terms of service, and (2) the
                TCPA in the US allows civil damages up to $1,500 per
                unsolicited auto-dialed call. We enjoy this website existing.
                This approach is the same dumb fun with none of the lawsuits.
              </p>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20 h-fit">
            <div className="bg-ink-800/60 border border-ink-600 rounded-2xl p-5">
              <h3 className="font-semibold">Selected</h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-4xl">{selected.emoji}</span>
                <div>
                  <div className="font-display text-lg font-bold leading-tight">
                    {selected.title}
                  </div>
                  <div className="text-xs text-ink-200">{selected.caller}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-100">{selected.description}</p>
            </div>

            <AdSlot slot="prank-sidebar" format="rectangle" minHeight={250} />
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-ink-200 mb-1">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 bg-ink-900 border border-ink-600 rounded-lg px-3 text-sm focus:outline-none focus:border-neon-blue"
      />
    </label>
  );
}
