import { motion } from "framer-motion";
import type { RoastTier } from "../lib/roasts";

type Props = {
  tier: RoastTier;
  speaking?: boolean;
};

const HUES: Record<RoastTier, string> = {
  0: "#f5e5c8",
  1: "#f7c592",
  2: "#f28a5b",
  3: "#e04b3a",
  4: "#9b1f2a",
  5: "#7a1220",
  6: "#2b0a10",
  7: "#0a0a0a",
};

const EYE_WHITES: Record<RoastTier, string> = {
  0: "#ffffff",
  1: "#fff9ec",
  2: "#fff3c4",
  3: "#fde1b0",
  4: "#f7baba",
  5: "#f2b2b2",
  6: "#f0e7ff",
  7: "#e6f7ff",
};

export function AngryAvatar({ tier, speaking }: Props) {
  const face = HUES[tier];
  const eyes = EYE_WHITES[tier];
  const angerShake = 0.3 + tier * 0.6;
  const browAngle = -4 - tier * 10;
  const mouthOpen = speaking ? 10 : 4 + tier * 2;
  const steamOpacity = tier >= 2 ? 1 : 0;
  const veinOpacity = tier >= 3 ? 1 : 0;
  const teethOpacity = tier >= 2 ? 1 : 0;

  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: 240, height: 240 }}
      animate={{
        x: [0, -angerShake, angerShake, 0],
        y: [0, angerShake, -angerShake, 0],
      }}
      transition={{
        duration: 0.22,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Steam */}
      <motion.svg
        viewBox="0 0 200 80"
        className="absolute -top-10 left-1/2 -translate-x-1/2"
        style={{ width: 180, height: 80, opacity: steamOpacity }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={60 + i * 40}
            cy={50}
            r={12}
            fill="#ffffff"
            opacity={0.5}
            animate={{ cy: [50, 0], opacity: [0.6, 0] }}
            transition={{
              duration: 1.1 + i * 0.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.25,
            }}
          />
        ))}
      </motion.svg>

      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="faceG" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={face} />
            <stop offset="100%" stopColor={shade(face, -0.3)} />
          </radialGradient>
          <linearGradient id="mouthG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b0a10" />
            <stop offset="100%" stopColor="#5a0d16" />
          </linearGradient>
        </defs>

        {/* Head */}
        <circle
          cx={100}
          cy={100}
          r={85}
          fill="url(#faceG)"
          stroke="#1a1a1a"
          strokeWidth={3}
        />

        {/* Vein */}
        <motion.path
          d="M70 45 C 75 55, 85 55, 80 70"
          fill="none"
          stroke="#3a0f18"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ opacity: veinOpacity }}
          animate={{ opacity: [veinOpacity, veinOpacity * 0.4, veinOpacity] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />

        {/* Brows */}
        <g transform={`translate(60 80) rotate(${browAngle} 20 5)`}>
          <rect
            width={40}
            height={10}
            rx={5}
            fill="#1a1a1a"
          />
        </g>
        <g transform={`translate(100 80) rotate(${-browAngle} 20 5)`}>
          <rect
            width={40}
            height={10}
            rx={5}
            fill="#1a1a1a"
          />
        </g>

        {/* Eyes */}
        <g>
          <circle cx={75} cy={110} r={13} fill={eyes} stroke="#1a1a1a" strokeWidth={2} />
          <circle cx={125} cy={110} r={13} fill={eyes} stroke="#1a1a1a" strokeWidth={2} />
          <motion.circle
            cx={75}
            cy={112}
            r={5}
            fill="#1a1a1a"
            animate={{ cx: [73, 77, 75], cy: [112, 110, 112] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.circle
            cx={125}
            cy={112}
            r={5}
            fill="#1a1a1a"
            animate={{ cx: [127, 123, 125], cy: [112, 110, 112] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </g>

        {/* Mouth */}
        <motion.ellipse
          cx={100}
          cy={148}
          rx={30 + tier * 3}
          ry={mouthOpen}
          fill="url(#mouthG)"
          stroke="#1a1a1a"
          strokeWidth={2}
          animate={{
            ry: speaking ? [mouthOpen * 0.4, mouthOpen * 1.2, mouthOpen * 0.6] : [mouthOpen, mouthOpen * 1.05, mouthOpen],
          }}
          transition={{
            duration: speaking ? 0.18 : 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Teeth */}
        <g style={{ opacity: teethOpacity }}>
          <rect x={80} y={141} width={40} height={5} fill="#f8f0d8" />
          <line x1={90} y1={141} x2={90} y2={146} stroke="#1a1a1a" strokeWidth={0.8} />
          <line x1={100} y1={141} x2={100} y2={146} stroke="#1a1a1a" strokeWidth={0.8} />
          <line x1={110} y1={141} x2={110} y2={146} stroke="#1a1a1a" strokeWidth={0.8} />
        </g>
      </svg>
    </motion.div>
  );
}

function shade(hex: string, pct: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const adj = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c + (pct > 0 ? (255 - c) : c) * pct)));
  const to = (n: number) => n.toString(16).padStart(2, "0");
  return `#${to(adj(r))}${to(adj(g))}${to(adj(b))}`;
}
