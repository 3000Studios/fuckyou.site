import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tokens, type Wallet } from "../lib/tokens";

type Props = { variant?: "pill" | "inline" };

export function TokenBadge({ variant = "pill" }: Props) {
  const [w, setW] = useState<Wallet>(() => tokens.get());
  useEffect(() => tokens.subscribe(setW), []);

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm">
        <CoinIcon />
        <span className="font-mono">{w.balance}</span>
        <span className="text-ink-200">tokens</span>
      </span>
    );
  }

  return (
    <Link
      to="/tokens"
      aria-label={`${w.balance} tokens, get more`}
      className="inline-flex items-center gap-2 px-3 h-9 rounded-full bg-ink-800 border border-ink-600 hover:border-neon-amber/70 transition-colors"
    >
      <CoinIcon />
      <span className="font-mono text-sm">{w.balance}</span>
      <span className="text-xs text-ink-200">tokens</span>
    </Link>
  );
}

function CoinIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-neon-amber via-yellow-400 to-orange-500 text-ink-950 font-bold text-[10px] ring-1 ring-black/50"
    >
      $
    </span>
  );
}
