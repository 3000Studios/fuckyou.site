import type { RoastTier } from "./roasts";

export type RoastCharacterId =
  | "default"
  | "the_manager"
  | "the_algorithm"
  | "the_ex"
  | "the_hr_drone"
  | "the_goblin";

export type RoastCharacter = {
  id: RoastCharacterId;
  name: string;
  tagline: string;
  vibe: string;
  accentGradient: string;
  difficulty: number; // tier acceleration multiplier
  maxTier: RoastTier;
};

export const ROAST_CHARACTERS: RoastCharacter[] = [
  {
    id: "default",
    name: "The Rant Bot",
    tagline: "Classic heat, clean chaos.",
    vibe: "Fast escalation. No mercy. Still funny.",
    accentGradient: "from-neon-red/25 via-ink-900 to-ink-950",
    difficulty: 1.0,
    maxTier: 7,
  },
  {
    id: "the_manager",
    name: "Your Manager",
    tagline: "Weaponized calm.",
    vibe: "Passive-aggressive. Corporate. Devastating in a polite font.",
    accentGradient: "from-amber-500/25 via-ink-900 to-ink-950",
    difficulty: 1.15,
    maxTier: 6,
  },
  {
    id: "the_algorithm",
    name: "The Algorithm",
    tagline: "It knows what you did.",
    vibe: "Reads your input like it’s engagement data and humiliates you accordingly.",
    accentGradient: "from-neon-blue/25 via-ink-900 to-ink-950",
    difficulty: 1.25,
    maxTier: 7,
  },
  {
    id: "the_ex",
    name: "The Ex",
    tagline: "Precision damage.",
    vibe: "Short sentences. Maximum emotional crits. Still smiling.",
    accentGradient: "from-fuchsia-500/20 via-ink-900 to-ink-950",
    difficulty: 1.2,
    maxTier: 7,
  },
  {
    id: "the_hr_drone",
    name: "HR Drone",
    tagline: "Compliance but make it cruel.",
    vibe: "Talks like a policy doc, roasts like a lawsuit.",
    accentGradient: "from-emerald-400/15 via-ink-900 to-ink-950",
    difficulty: 1.1,
    maxTier: 6,
  },
  {
    id: "the_goblin",
    name: "Basement Goblin",
    tagline: "Unfiltered, but not hateful.",
    vibe: "Chaotic little gremlin energy. Goes hard fast.",
    accentGradient: "from-neon-red/20 via-ink-900 to-ink-950",
    difficulty: 1.35,
    maxTier: 7,
  },
];

export function getCharacter(id: RoastCharacterId): RoastCharacter {
  return ROAST_CHARACTERS.find((c) => c.id === id) || ROAST_CHARACTERS[0]!;
}

