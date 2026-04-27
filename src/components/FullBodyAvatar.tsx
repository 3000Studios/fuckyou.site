import { motion } from "framer-motion";
import type { RoastTier } from "../lib/roasts";
import { AngryAvatar } from "./AngryAvatar";

type Props = {
  tier: RoastTier;
  speaking?: boolean;
  characterName?: string;
};

function glowForTier(tier: RoastTier): string {
  if (tier >= 6) return "rgba(41,216,255,0.35)";
  if (tier >= 4) return "rgba(255,42,85,0.35)";
  if (tier >= 2) return "rgba(255,179,71,0.28)";
  return "rgba(255,42,85,0.18)";
}

export function FullBodyAvatar({ tier, speaking, characterName }: Props) {
  const shake = 0.25 + tier * 0.22;
  const lean = Math.min(10, tier * 1.2);
  const glow = glowForTier(tier);

  return (
    <motion.div
      className="relative w-full max-w-[380px] mx-auto"
      animate={{
        x: [0, -shake, shake, 0],
        y: [0, shake, -shake, 0],
        rotateZ: [0, -0.15, 0.15, 0],
      }}
      transition={{ duration: 0.22, repeat: Infinity, ease: "linear" }}
      style={{
        filter: `drop-shadow(0 22px 70px ${glow})`,
      }}
    >
      <div className="relative aspect-[3/4] rounded-3xl border border-ink-600 bg-ink-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,42,85,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(41,216,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* floor */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[80%] h-10 rounded-[999px] bg-black/40 blur-xl" />

        {/* character */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-10"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: [0, lean, 0, -lean, 0],
          }}
          transition={{ duration: 2.6 - Math.min(1.4, tier * 0.16), repeat: Infinity }}
        >
          {/* arms */}
          <motion.div
            className="absolute bottom-[34%] left-1/2 -translate-x-1/2 w-[92%] flex items-center justify-between pointer-events-none"
            animate={{
              rotateZ: [0, tier >= 4 ? 2 : 1, 0, tier >= 4 ? -2 : -1, 0],
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-3 w-28 rounded-full bg-gradient-to-r from-ink-900 to-ink-700 opacity-70 shadow-card" />
            <div className="h-3 w-28 rounded-full bg-gradient-to-l from-ink-900 to-ink-700 opacity-70 shadow-card" />
          </motion.div>

          {/* torso */}
          <div className="relative w-[56%] h-[34%] rounded-[2.25rem] bg-gradient-to-b from-ink-700/70 via-ink-800 to-ink-950 border border-ink-600 shadow-card">
            <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_60%)]" />
            <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_70%_60%,rgba(255,42,85,0.10),transparent_60%)]" />
          </div>

          {/* legs */}
          <div className="mt-3 flex items-end gap-4">
            <div className="h-20 w-10 rounded-2xl bg-gradient-to-b from-ink-800 to-ink-950 border border-ink-700 shadow-card" />
            <div className="h-20 w-10 rounded-2xl bg-gradient-to-b from-ink-800 to-ink-950 border border-ink-700 shadow-card" />
          </div>

          {/* head */}
          <div className="absolute top-7">
            <AngryAvatar tier={tier} speaking={speaking} />
          </div>
        </motion.div>

        {/* label */}
        {characterName ? (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
            <div className="rounded-full border border-ink-600 bg-ink-950/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-ink-100">
              {characterName}
            </div>
            <div className="rounded-full border border-ink-600 bg-ink-950/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-ink-200">
              Level {tier + 1}
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

