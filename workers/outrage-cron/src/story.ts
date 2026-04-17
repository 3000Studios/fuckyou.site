// Story generator — same content pool as scripts/generate-outrage-story.mjs
// but pure functions (no fs). Used by the Worker cron.

interface Kicker {
  kicker: string;
  emoji: string;
  gradient: string;
  tag: string;
}

const KICKERS: Kicker[] = [
  { kicker: "Modern Life", emoji: "🧻", gradient: "from-amber-500/25 via-ink-900 to-ink-950", tag: "daily-rage" },
  { kicker: "Work", emoji: "💼", gradient: "from-neon-red/30 via-ink-900 to-ink-950", tag: "work" },
  { kicker: "Tech", emoji: "🖥️", gradient: "from-neon-blue/25 via-ink-900 to-ink-950", tag: "tech" },
  { kicker: "Travel", emoji: "✈️", gradient: "from-fuchsia-500/25 via-ink-900 to-ink-950", tag: "travel" },
  { kicker: "Money", emoji: "💸", gradient: "from-neon-red/25 via-ink-900 to-ink-950", tag: "money" },
  { kicker: "Food", emoji: "🍔", gradient: "from-amber-500/30 via-ink-900 to-ink-950", tag: "food" },
];

interface Ctx {
  thing: string;
  n: number;
}

interface Template {
  title: (t: Ctx) => string;
  description: (t: Ctx) => string;
  intro: (t: Ctx) => string;
  takes: (t: Ctx) => string[];
  blame: (t: Ctx) => string[];
  conclusion: (t: Ctx) => string;
  videoQueries: string[];
  tags: string[];
}

const TEMPLATES: Template[] = [
  {
    title: (t) => `New ${t.thing} Fee Announced, Applies Retroactively`,
    description: (t) =>
      `A $${t.n} "convenience" fee has been added to things that were previously free, including existing transactions. Everyone is very chill about it.`,
    intro: (t) =>
      `A company you already use just added a ${t.n}-dollar "${t.thing} adjustment" fee to every transaction, retroactively. The press release calls it "a more honest pricing moment." Customers call it "a moral injury."`,
    takes: () => [
      `The fee is listed as "not a fee" in the fine print, and "a service enrichment" in the email that announced it.`,
      `The FAQ insists the fee is "optional," but the opt-out is hidden inside a phone tree voiced by a man who is clearly reading from a hostage note.`,
      `This is the tenth "one-time" fee this company has launched this year. The tenth one-time.`,
    ],
    blame: () => [
      `The consultant who brought this to a whiteboard and was not tackled in the parking lot.`,
      `The automated "we value your business" email that was sent to 14 million people 3 seconds after the announcement.`,
      `You, a little, for continuing to give them money.`,
    ],
    conclusion: () =>
      `No, you are not overreacting. Yes, it is cheaper to keep using them than to switch, and they know it. That's the whole business model. Breathe. Rage here. It's free.`,
    videoQueries: ["hidden fees", "junk fees customer complaint", "fees customers angry"],
    tags: ["junk-fees", "late-stage", "daily-rage"],
  },
  {
    title: (t) => `${t.thing} App Update Removes The Only Thing You Used`,
    description: (t) =>
      `The ${t.thing} app pushed a redesign overnight, and it removed the one button you used every day. It was replaced with an AI.`,
    intro: (t) =>
      `The ${t.thing} app you use every day silently auto-updated last night. The entire interface has been re-arranged. Your favorite button is gone. In its place, a small chat icon labeled "Ask AI," which, when pressed, apologizes for being unable to help with anything at all.`,
    takes: () => [
      `The release notes describe this as "a streamlined, intelligent new experience." The experience is: you cannot find the menu.`,
      `The old app worked. Nobody asked for this. A very small room of people decided this on your behalf.`,
      `The one-star reviews are unanimous. The response from the company is "thank you for your feedback," which is corporate for "we will not be adjusting this."`,
    ],
    blame: () => [
      `The product team's Q4 OKR called "introduce AI somewhere, anywhere, please."`,
      `The "user research" that was conducted entirely by asking the CEO.`,
      `Whoever added haptic feedback to a button that no longer does anything.`,
    ],
    conclusion: () =>
      `This is not you being bad with technology. This is technology being bad at you. You are allowed to be mad. Leave a review. Leave two.`,
    videoQueries: ["app update redesign rage", "bad ui redesign", "app users angry update"],
    tags: ["tech", "ui", "enshittification"],
  },
  {
    title: (t) => `Customer Service Wait Time Reaches ${t.n} Minutes Again`,
    description: () =>
      `An actual human is on the line. It's the same hold music from 2008. The reason you're calling? Their mistake.`,
    intro: (t) =>
      `Customer service hold times at a major ${t.thing} provider have reached ${t.n} minutes. The hold music is a single looped bar of jazz piano. The automated voice occasionally says "your call is very important to us" in a way that sounds like it's giving up on the word "important."`,
    takes: () => [
      `The reason you're calling is a billing error that you did not make. You have to sit in queue like you are the one who screwed up.`,
      `The chatbot tried first, and every message ended with the phrase "Is there anything else I can help you with?" after helping with zero things.`,
      `The "estimated wait time" has not changed in 40 minutes. The estimation algorithm is vibes.`,
    ],
    blame: () => [
      `The executive who proudly said "our customers prefer self-service" on an earnings call, while eating a $38 salad.`,
      `The hold message that tries to upsell you on a subscription while you are waiting to complain about the other subscription.`,
      `The universe, for allowing this to be the fourth time today.`,
    ],
    conclusion: () =>
      `You did nothing wrong. You are not alone. Every single person on that hold is also silently judging the jazz. Rage here. It costs zero minutes.`,
    videoQueries: ["customer service hold forever", "long customer service wait", "hold music customer angry"],
    tags: ["customer-service", "daily-rage", "corporate"],
  },
  {
    title: () => `Delivery App Raises Minimum Tip to Confusing New Amount`,
    description: (t) =>
      `The default tip is now 22% before a $${t.n} "service" fee that, to be clear, does not go to the driver.`,
    intro: () =>
      `A major delivery app has quietly moved its pre-selected tip options to 22%, 28%, and 35%, with the 15% option now hidden three menus deep behind a "Custom" button that warns you against selecting it.`,
    takes: (t) => [
      `The app also charges a "service fee" of $${t.n}, which does not go to the driver. The driver is also confused about who it goes to.`,
      `The in-app label now reads "Your Appreciation." This is not appreciation. This is a math problem you did not consent to.`,
      `Once upon a time you could just get a pizza. Now every step is a moral dilemma with UX design.`,
    ],
    blame: () => [
      `The company, for outsourcing compensation to a guilt button on your screen.`,
      `The "default" logic that presumes you want to tip 28% on a $4 side of fries.`,
      `The era, broadly.`,
    ],
    conclusion: () =>
      `Tip your drivers. Also, it's fine to notice that the platform is the villain here and they love that you're mad at the guy on the bike.`,
    videoQueries: ["delivery app tipping too high", "tip creep prompt", "food delivery fees ridiculous"],
    tags: ["money", "tipping", "food"],
  },
  {
    title: (t) => `${t.thing} Subscription Price Raised With 0 Days Notice`,
    description: (t) =>
      `Your ${t.thing} subscription is now $${t.n}/month. The email says "thank you for being a loyal member." The email did not say this was happening.`,
    intro: () =>
      `You noticed the price change on your bank statement. The company sent an email "announcing" the change on the day of, at 11:43pm, with the subject line "A small update to your plan." The "small update" is a 38% increase.`,
    takes: (t) => [
      `The announcement email ends with "we truly value your loyalty." Your loyalty is currently being charged an extra $${t.n}.`,
      `The FAQ offers a "grandfather plan" that can be unlocked by completing a 14-step chat with an AI assistant named "Blake."`,
      `The churn email you'll get tomorrow will offer you half off if you just stay. So the original price was a lie, but only until you threatened to leave.`,
    ],
    blame: () => [
      `Investors, probably.`,
      `The dashboard that automatically retried your card three times until it went through on a Sunday at 3am.`,
      `Whoever made "loyalty" a revenue stream and not a value.`,
    ],
    conclusion: () =>
      `Cancel it. Read about it. Leave a review. Open a fresh browser tab, sign up again at the "winback" price, and laugh quietly into the void. The void laughs back.`,
    videoQueries: ["subscription price hike", "streaming service increases price", "subscription raise prices customer angry"],
    tags: ["subscription-hell", "money", "late-stage"],
  },
];

const THINGS = [
  "airport parking",
  "gym membership",
  "banking",
  "rideshare",
  "streaming",
  "cable",
  "gas",
  "childcare",
  "insurance",
  "phone plan",
  "email",
  "cloud storage",
  "grocery delivery",
  "home warranty",
];

function slugify(s: string): string {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function tsString(s: string): string {
  return JSON.stringify(String(s));
}

export interface OutrageStory {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  emoji: string;
  gradient: string;
  kicker: string;
  source: { name: string; url: string };
  videoQuery: string;
  tags: string[];
  intro: string;
  takes: string[];
  blame: string[];
  conclusion: string;
}

export function buildStory(): OutrageStory {
  const k = pick(KICKERS);
  const tmpl = pick(TEMPLATES);
  const thing = pick(THINGS);
  const n = 5 + Math.floor(Math.random() * 55);
  const ctx: Ctx = { thing, n };

  const title = tmpl.title(ctx);
  const nowISO = new Date().toISOString();
  const dateStamp = nowISO.slice(0, 10);
  const base = slugify(title);
  const slug = `${base}-${dateStamp}-${Math.floor(Math.random() * 9000 + 1000)}`;

  return {
    slug,
    title,
    description: tmpl.description(ctx),
    publishedAt: nowISO,
    emoji: k.emoji,
    gradient: k.gradient,
    kicker: k.kicker,
    source: { name: "Wire Report", url: "https://news.google.com" },
    videoQuery: pick(tmpl.videoQueries),
    tags: [k.tag, ...tmpl.tags].slice(0, 4),
    intro: tmpl.intro(ctx),
    takes: tmpl.takes(ctx),
    blame: tmpl.blame(ctx),
    conclusion: tmpl.conclusion(ctx),
  };
}

export function serializeStory(story: OutrageStory): string {
  const lines: string[] = [];
  lines.push("  {");
  lines.push(`    slug: ${tsString(story.slug)},`);
  lines.push(`    title: ${tsString(story.title)},`);
  lines.push(`    description: ${tsString(story.description)},`);
  lines.push(`    publishedAt: ${tsString(story.publishedAt)},`);
  lines.push(`    emoji: ${tsString(story.emoji)},`);
  lines.push(`    gradient: ${tsString(story.gradient)},`);
  lines.push(`    kicker: ${tsString(story.kicker)},`);
  lines.push(
    `    source: { name: ${tsString(story.source.name)}, url: ${tsString(story.source.url)} },`
  );
  lines.push(`    videoQuery: ${tsString(story.videoQuery)},`);
  lines.push(`    tags: [${story.tags.map((t) => tsString(t)).join(", ")}],`);
  lines.push(`    intro: ${tsString(story.intro)},`);
  lines.push(
    `    takes: [\n${story.takes.map((t) => `      ${tsString(t)}`).join(",\n")},\n    ],`
  );
  lines.push(
    `    blame: [\n${story.blame.map((t) => `      ${tsString(t)}`).join(",\n")},\n    ],`
  );
  lines.push(`    conclusion: ${tsString(story.conclusion)},`);
  lines.push("  },");
  return lines.join("\n");
}
