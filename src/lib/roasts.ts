export type RoastTier = 0 | 1 | 2 | 3 | 4;

export const TIER_LABELS: Record<RoastTier, string> = {
  0: "Mildly Annoyed",
  1: "Slightly Rude",
  2: "Actually Mean",
  3: "Unhinged",
  4: "Apocalyptic",
};

export const TIER_COLORS: Record<RoastTier, string> = {
  0: "bg-ink-700 text-ink-100",
  1: "bg-amber-500/20 text-amber-200",
  2: "bg-orange-500/25 text-orange-200",
  3: "bg-neon-red/25 text-neon-red",
  4: "bg-fuchsia-500/30 text-fuchsia-200",
};

const TIER_0: string[] = [
  "Look at you. Breathing. Barely.",
  "That outfit has the energy of 'I give up.'",
  "You sigh like the world owes you rent.",
  "Your personality is unseasoned chicken.",
  "You're the human equivalent of a loading spinner.",
  "Your aura is low battery mode.",
  "You walk like your back hurts at 24.",
  "You look like a Sunday that refuses to end.",
  "The vibe? Expired yogurt.",
  "You're the reason group photos get retaken.",
];

const TIER_1: string[] = [
  "You have the confidence of someone who has never been interrupted.",
  "Your posts get two likes and one is your mom on a burner account.",
  "You argue with strangers online because your real life is a TED Talk to an empty room.",
  "Your taste in music is just the algorithm giving up.",
  "Your texting style makes me want to block radio waves.",
  "You say 'entrepreneur' like it's a whole personality and your Shopify store sold three things.",
  "You dress like the ex who still owes people money.",
  "Your entire brand is 'I almost went to therapy once.'",
  "You smell like you microwaved a candle.",
  "You're the kind of person who claps when the plane lands and then DMs the pilot.",
];

const TIER_2: string[] = [
  "You peaked the day you learned to parallel park.",
  "Your face is a 'loading' screen that never finishes.",
  "You text like you're being held hostage by autocorrect and stockholm syndrome set in.",
  "You treat personality like it's a subscription you keep forgetting to renew.",
  "You're not an introvert, nobody's asking.",
  "You have the charisma of a hotel lobby.",
  "Your vibe is someone who rehearses being spontaneous in the mirror.",
  "Your group chat is three people and one of them is the dog.",
  "You flirt like HR is watching.",
  "You wear cologne like it's an apology nobody asked for.",
];

const TIER_3: string[] = [
  "Your whole personality is someone who almost got famous on TikTok once.",
  "You're proof that natural selection takes smoke breaks.",
  "You have the aura of a deactivated LinkedIn profile.",
  "Your ex didn't move on, they just evolved past you like a Pokémon.",
  "You're not a main character, you're the 'additional' in the credits.",
  "You have the charisma of an expired coupon for 3% off.",
  "You argue online like your Wi-Fi is the only thing holding your self-esteem together.",
  "You're emotionally available the way gas station sushi is technically food.",
  "You look like a motivational poster that sued for wrongful hanging.",
  "Your whole energy is someone who uses 'no offense' as punctuation.",
];

const TIER_4: string[] = [
  "Your group chat uses you as the warning story.",
  "You have the confidence of a man who lost custody in a text message.",
  "You are the reason restaurants add a surcharge for 'vibes.'",
  "Your birth certificate is the manager of God's regrets.",
  "You have the stability of a chair someone already took a leg off of.",
  "You're not haunted, you are the thing that moves in other people's houses.",
  "You're the human incarnation of 'we need to talk.'",
  "You have the emotional range of a captcha.",
  "The silence at your funeral is already being rehearsed.",
  "You are the human version of a gas station hot dog on hour six.",
];

export const ROAST_BANK: Record<RoastTier, string[]> = {
  0: TIER_0,
  1: TIER_1,
  2: TIER_2,
  3: TIER_3,
  4: TIER_4,
};

export function nextTier(t: RoastTier): RoastTier {
  return Math.min(4, t + 1) as RoastTier;
}

export function pickRoast(
  tier: RoastTier,
  seen: Set<string>
): { text: string; tier: RoastTier } {
  const pool = ROAST_BANK[tier].filter((r) => !seen.has(r));
  const src = pool.length ? pool : ROAST_BANK[tier];
  const text = src[Math.floor(Math.random() * src.length)]!;
  return { text, tier };
}

const TRIGGER_WORDS = [
  "shut",
  "stop",
  "mom",
  "ugly",
  "bald",
  "broke",
  "loser",
  "mad",
  "lame",
  "dumb",
  "stupid",
  "cringe",
  "hate",
  "quit",
  "whatever",
  "no",
  "you",
  "bro",
  "lmao",
];

export function angerFromInput(input: string): number {
  const lower = input.toLowerCase();
  let anger = 0;
  if (lower.length > 2) anger += 1;
  const hits = TRIGGER_WORDS.filter((w) => lower.includes(w)).length;
  anger += hits;
  if (/[!]{2,}|[?]{2,}/.test(input)) anger += 1;
  if (input === input.toUpperCase() && input.trim().length > 3) anger += 2;
  return anger;
}
