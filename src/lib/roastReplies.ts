import type { RoastTier } from "./roasts";
import { pickRoast } from "./roasts";
import type { RoastCharacterId } from "./roastArena";

type Topic =
  | "money"
  | "looks"
  | "intelligence"
  | "work"
  | "social"
  | "confidence"
  | "behavior"
  | "tech"
  | "general";

const TOPIC_WORDS: Record<Topic, string[]> = {
  money: ["broke", "poor", "rent", "money", "wallet", "salary", "job", "debt"],
  looks: ["ugly", "bald", "hair", "face", "outfit", "smell", "style", "skin"],
  intelligence: ["dumb", "stupid", "idiot", "moron", "brain", "smart", "iq"],
  work: ["boss", "manager", "meeting", "slack", "email", "hr", "office"],
  social: ["friends", "group chat", "date", "party", "text", "dm", "followers"],
  confidence: ["confident", "ego", "main character", "alpha", "sigma"],
  behavior: ["annoying", "loud", "cringe", "weird", "toxic", "hate"],
  tech: ["wifi", "app", "update", "captcha", "algorithm", "phone", "computer"],
  general: [],
};

function clampTier(t: number): RoastTier {
  return Math.max(0, Math.min(7, Math.round(t))) as RoastTier;
}

function extractSalient(input: string): { phrase: string; topics: Topic[] } {
  const raw = input
    .replace(/[^\w\s'’-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = raw.split(/\s+/).filter(Boolean);
  const phrase = words.slice(0, 7).join(" ");

  const lower = raw.toLowerCase();
  const topics: Topic[] = [];
  (Object.keys(TOPIC_WORDS) as Topic[]).forEach((t) => {
    if (t === "general") return;
    const hits = TOPIC_WORDS[t].some((w) => lower.includes(w));
    if (hits) topics.push(t);
  });
  if (topics.length === 0) topics.push("general");
  return { phrase, topics };
}

function characterFlavor(id: RoastCharacterId): { opener: string[]; closer: string[] } {
  switch (id) {
    case "the_manager":
      return {
        opener: [
          "Quick thought:",
          "Just circling back:",
          "Friendly reminder:",
          "Per my last message:",
        ],
        closer: [
          "Let’s align offline.",
          "We can workshop this later.",
          "Please see attached: reality.",
        ],
      };
    case "the_algorithm":
      return {
        opener: [
          "Engagement detected:",
          "Recommendation:",
          "Based on your behavior:",
          "Signal received:",
        ],
        closer: [
          "We’ve updated your cringe score.",
          "This will be used to personalize your suffering.",
          "Enjoy your suggested consequences.",
        ],
      };
    case "the_ex":
      return {
        opener: ["Oh.", "Sure.", "Right.", "Okay."],
        closer: [
          "Anyway.",
          "Good luck though.",
          "You’ll figure it out. Probably not, but…",
        ],
      };
    case "the_hr_drone":
      return {
        opener: [
          "For compliance purposes:",
          "Per policy:",
          "This is being documented:",
          "We appreciate your feedback:",
        ],
        closer: [
          "Please refrain from being you in shared spaces.",
          "This concludes the incident.",
          "We will follow up never.",
        ],
      };
    case "the_goblin":
      return {
        opener: [
          "Hehehe okay:",
          "Listen, creature:",
          "Oh you want smoke?",
          "Say less:",
        ],
        closer: ["Goblin out.", "Go drink water.", "Touch grass. Or don’t."],
      };
    default:
      return { opener: ["Alright:"], closer: [""] };
  }
}

const TARGETED_TEMPLATES: Record<
  Topic,
  Array<(p: { phrase: string; tier: RoastTier }) => string>
> = {
  money: [
    ({ phrase }) => `You said “${phrase}” like your wallet can back it up.`,
    ({ phrase }) => `“${phrase}” — bold coming from a person with subscription debt.`,
  ],
  looks: [
    ({ phrase }) => `You said “${phrase}” like mirrors haven't been warning you for years.`,
    ({ phrase }) => `“${phrase}” — your outfit is already doing the talking and it’s losing.`,
  ],
  intelligence: [
    ({ phrase }) => `You said “${phrase}” like thoughts don't bounce off your skull.`,
    ({ phrase }) => `“${phrase}” — you’re arguing like reading comprehension is optional.`,
  ],
  work: [
    ({ phrase }) => `You said “${phrase}” like your calendar isn't full of meetings you hate.`,
    ({ phrase }) => `“${phrase}” — the email thread is longer than your attention span.`,
  ],
  social: [
    ({ phrase }) => `You said “${phrase}” like your group chat hasn’t muted you.`,
    ({ phrase }) => `“${phrase}” — your social battery is dead and it’s still outperforming you.`,
  ],
  confidence: [
    ({ phrase }) => `You said “${phrase}” like confidence is the same thing as being correct.`,
    ({ phrase }) => `“${phrase}” — that’s not aura. That’s audacity.`,
  ],
  behavior: [
    ({ phrase }) => `You said “${phrase}” like being annoying is a skill badge.`,
    ({ phrase }) => `“${phrase}” — your personality is a side quest nobody accepted.`,
  ],
  tech: [
    ({ phrase }) => `You said “${phrase}” like you don't still reset your router by praying.`,
    ({ phrase }) => `“${phrase}” — you have the stability of a beta app on hotel Wi‑Fi.`,
  ],
  general: [
    ({ phrase }) => `You said “${phrase}” like that was going to save you.`,
    ({ phrase }) => `“${phrase}” — okay, but you still sound like a loading spinner.`,
  ],
};

export function nextTierFromInput(
  currentTier: RoastTier,
  anger: number,
  difficulty = 1
): RoastTier {
  const raw = currentTier + Math.ceil((anger * 0.55 + 0.6) * difficulty);
  return clampTier(Math.max(currentTier, raw));
}

export function generateBotReply(params: {
  userText: string;
  tier: RoastTier;
  characterId: RoastCharacterId;
  seen: Set<string>;
}): { text: string; tier: RoastTier } {
  const { userText, tier, characterId, seen } = params;
  const { phrase, topics } = extractSalient(userText);
  const topic = topics[0] || "general";

  const targetedPool = TARGETED_TEMPLATES[topic] || TARGETED_TEMPLATES.general;
  const targeted =
    targetedPool[Math.floor(Math.random() * targetedPool.length)]!({
      phrase: phrase || userText.slice(0, 32),
      tier,
    });

  const bank = pickRoast(tier, seen).text;

  const flavor = characterFlavor(characterId);
  const open = flavor.opener[Math.floor(Math.random() * flavor.opener.length)]!;
  const close =
    flavor.closer[Math.floor(Math.random() * flavor.closer.length)] || "";

  const stitched = [open, targeted, bank, close]
    .filter((s) => s && s.trim().length)
    .join(" ");

  return { text: stitched, tier };
}

