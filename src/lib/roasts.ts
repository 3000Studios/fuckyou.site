export type RoastTier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const TIER_LABELS: Record<RoastTier, string> = {
  0: "Mildly Annoyed",
  1: "Slightly Rude",
  2: "Actually Mean",
  3: "Unhinged",
  4: "Apocalyptic",
  5: "Nuclear",
  6: "Cosmic",
  7: "Singularity",
};

export const TIER_COLORS: Record<RoastTier, string> = {
  0: "bg-ink-700 text-ink-100",
  1: "bg-amber-500/20 text-amber-200",
  2: "bg-orange-500/25 text-orange-200",
  3: "bg-neon-red/25 text-neon-red",
  4: "bg-fuchsia-500/30 text-fuchsia-200",
  5: "bg-rose-500/25 text-rose-200",
  6: "bg-neon-blue/20 text-neon-blue",
  7: "bg-white/10 text-white",
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

const TIER_5: string[] = [
  "You talk like a person who thinks 'accountability' is a hate crime.",
  "Your confidence is a loan. The interest is embarrassing.",
  "You give advice like you’ve never been wrong, which is wild because you are right now.",
  "You’ve got the vibe of a group project where the loudest person did the least.",
  "You treat basic decency like it’s an optional add-on you didn’t purchase.",
  "Your self-awareness is on airplane mode.",
  "You think you’re the plot, but you’re the pop-up that blocks the plot.",
  "Your opinions arrive uninvited and leave a mess like a toddler with glitter.",
  "You radiate the energy of a man who says “just being honest” and then lies.",
  "Your presence is a software update nobody consented to.",
];

const TIER_6: string[] = [
  "You’re the reason the universe invented 'do not disturb.'",
  "If consequences were rain, you’d still walk around shocked you’re wet.",
  "You’re a walking reminder that confidence and competence have never met.",
  "Your personality is a beta feature that should not have shipped.",
  "You’ve got the aura of a refund request written in all caps.",
  "You could make a therapist request hazard pay just by entering a room.",
  "You’re the human version of buffering: loud, slow, and always in the way.",
  "Even your shadow looks tired of you.",
  "You give 'I peak in the comments section' energy.",
  "Your vibe is an apology draft with no intention of sending it.",
];

const TIER_7: string[] = [
  "You are so confidently incorrect you could power a small city.",
  "You don’t have a personality — you have recurring notifications.",
  "If self-reflection were a mirror, you’d still be looking at the wall and calling it growth.",
  "You move through life like a pop quiz: nobody asked, everybody suffers.",
  "Your life is a tutorial you keep skipping and then blaming the game.",
  "You have the audacity of a man who breaks the rules and asks why the system exists.",
  "Your emotional maturity is a loading bar stuck at 2%.",
  "You’re the reason ‘mute’ is a love language.",
  "Your inner child needs supervision.",
  "Even your ego is like, 'hey… chill.'",
];

export const ROAST_BANK: Record<RoastTier, string[]> = {
  0: TIER_0,
  1: TIER_1,
  2: TIER_2,
  3: TIER_3,
  4: TIER_4,
  5: TIER_5,
  6: TIER_6,
  7: TIER_7,
};

export function nextTier(t: RoastTier): RoastTier {
  return Math.min(7, t + 1) as RoastTier;
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
  if (/\b(fuck|shit|bitch|asshole|idiot|moron|trash|garbage|clown)\b/i.test(input))
    anger += 2;
  if (lower.split(/\s+/).length >= 14) anger += 1;
  return anger;
}
