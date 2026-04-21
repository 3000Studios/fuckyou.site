export type OutrageStory = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  emoji: string;
  gradient: string;
  kicker: string;
  source: { name: string; url: string };
  videoId?: string; // YouTube ID (for embed)
  videoQuery?: string; // Fallback topical search
  tags: string[];
  intro: string;
  takes: string[];
  blame: string[];
  conclusion: string;
};

export const OUTRAGE_STORIES: OutrageStory[] = [
  {
    slug: "new-insurance-fee-announced-applies-retroactively-2026-04-17-2663",
    title: "New insurance Fee Announced, Applies Retroactively",
    description: "A $11 \"convenience\" fee has been added to things that were previously free, including existing transactions. Everyone is very chill about it.",
    publishedAt: "2026-04-17T15:03:43.733Z",
    emoji: "✈️",
    gradient: "from-fuchsia-500/25 via-ink-900 to-ink-950",
    kicker: "Travel",
    source: { name: "Wire Report", url: "https://news.google.com" },
    videoQuery: "hidden fees",
    tags: ["travel", "junk-fees", "late-stage", "daily-rage"],
    intro: "A company you already use just added a 11-dollar \"insurance adjustment\" fee to every transaction, retroactively. The press release calls it \"a more honest pricing moment.\" Customers call it \"a moral injury.\"",
    takes: [
      "The fee is listed as \"not a fee\" in the fine print, and \"a service enrichment\" in the email that announced it.",
      "The FAQ insists the fee is \"optional,\" but the opt-out is hidden inside a phone tree voiced by a man who is clearly reading from a hostage note.",
      "This is the tenth \"one-time\" fee this company has launched this year. The tenth one-time.",
    ],
    blame: [
      "The consultant who brought this to a whiteboard and was not tackled in the parking lot.",
      "The automated \"we value your business\" email that was sent to 14 million people 3 seconds after the announcement.",
      "You, a little, for continuing to give them money.",
    ],
    conclusion: "No, you are not overreacting. Yes, it is cheaper to keep using them than to switch, and they know it. That's the whole business model. Breathe. Rage here. It's free.",
  },
  {
    slug: "grocery-bag-tax-is-back",
    title: "They Brought Back the Grocery Bag Tax and Nobody Voted on It",
    description:
      "Your lettuce is now a luxury item and the cashier is the one apologizing. We are in the worst timeline.",
    publishedAt: "2026-04-16T11:00:00Z",
    emoji: "🛒",
    gradient: "from-neon-red/35 via-ink-900 to-ink-950",
    kicker: "Modern Life",
    source: { name: "Wire Report", url: "https://news.google.com" },
    videoQuery: "grocery bag tax",
    tags: ["economy", "daily-rage", "small-things"],
    intro:
      "You walked in for a single onion. You walked out with financial trauma, a 10-cent plastic bag surcharge, and a receipt longer than your employment contract. This is normal now. This is the vibe.",
    takes: [
      "The bag tax was sold as 'environmental.' Bold, considering the planet is on fire and your lettuce is in a plastic clamshell inside a plastic bag inside a paper bag.",
      "Reusable bags solve nothing when you forget them in the car every single time, which is 100% of the time, for all of us, forever.",
      "The cashier is powerless. The cashier is sad. The cashier would also like to not pay for the bag.",
    ],
    blame: [
      "Whoever decided 10 cents was both 'barely anything' and 'the exact number to make you feel poor on a Tuesday.'",
      "The self-checkout machine that will still accuse you of theft even when you scanned it correctly, Janet.",
      "You, for continuing to go to the grocery store. That's the real crime.",
    ],
    conclusion:
      "You are not wrong for being annoyed. You are not dramatic. The grocery bag tax is a daily reminder that the small things have been financialized and there is no one to yell at who will hear you. So yell here. That's literally what this site is for.",
  },
  {
    slug: "airline-seat-fee-for-standing",
    title: "Airline Announces Fee For Standing During Flight",
    description:
      "You read that right. An airline has figured out how to charge you for the one thing you do for free: your entire body.",
    publishedAt: "2026-04-16T09:30:00Z",
    emoji: "✈️",
    gradient: "from-neon-blue/30 via-ink-900 to-ink-950",
    kicker: "Travel",
    source: { name: "Skyward Daily", url: "https://news.google.com" },
    videoQuery: "airline fees getting ridiculous",
    tags: ["travel", "late-stage", "corporate-evil"],
    intro:
      "A major airline has announced a new $9 'Vertical Mobility Convenience Charge' applied to anyone who stands up during their flight, including to use the bathroom. Industry analysts call it 'monetizing gravity.' Passengers call it 'are you out of your mind.'",
    takes: [
      "The baseline ticket now includes the plane, the seat, your own oxygen, and the promise that the pilot has been sober since 2019. Everything else is extra.",
      "There is no meaningful difference anymore between an airline fee structure and a Dungeons & Dragons spell list. 'For $29, the overhead bin opens with a smile.'",
      "The only thing flying coach has not been unbundled from is the crushing despair.",
    ],
    blame: [
      "Airline executives who discovered Excel has a 'multiply by shame' function.",
      "Whichever consultant said the phrase 'monetize micro-moments' without getting thrown out the window.",
      "The person who started boarding from the window seat even though they're in the aisle and ruined this for all of us.",
    ],
    conclusion:
      "There is no lesson here. There is no silver lining. This is just the cost of existing at 35,000 feet now. Just remember: your rage is valid, your wallet is weeping, and the snack is still a single cookie.",
  },
  {
    slug: "office-return-mandate-again",
    title: "Company Announces Return-To-Office Mandate For The Fourth Time",
    description:
      "Same company. Same email. Same begging. You remain, incredibly, still not impressed.",
    publishedAt: "2026-04-16T08:00:00Z",
    emoji: "🏢",
    gradient: "from-amber-500/25 via-ink-900 to-ink-950",
    kicker: "Work",
    source: { name: "Work Wire", url: "https://news.google.com" },
    videoQuery: "return to office mandate",
    tags: ["work", "corporate", "remote-life"],
    intro:
      "A Fortune 500 company has sent a 'final' return-to-office email for the fourth time in 18 months. The email includes the words 'culture,' 'synergy,' and 'we hear you.' Nobody has been heard.",
    takes: [
      "The company cafeteria serves sadness in three configurations. The commute costs $14 a day. The Wi-Fi somehow gets worse the closer you get to IT.",
      "They keep saying 'collaboration.' Collaboration is being stared at while you eat leftovers at your desk. Collaboration is a meeting that should have been a calendar cancellation.",
      "The real return-to-office policy is: 'We bought a lease and we are trying to Stockholm Syndrome everyone into validating it.'",
    ],
    blame: [
      "The CEO, for whom 'work from home' means 'work from my other home.'",
      "The VP who said in an all-hands that 'hallway energy is irreplaceable' while the entire hallway was at their desk on mute.",
      "Whoever invented the open-plan office. You did this. You are the villain. We see you.",
    ],
    conclusion:
      "You are tired. That is reasonable. That is not burnout, that is physics. Rest if you can. Ignore the email. They will send another one. They always do.",
  },
  {
    slug: "subscription-for-car-feature-you-already-bought",
    title: "Car Company Now Charges Monthly Fee for Heated Seats You Paid For",
    description:
      "You bought the car. You bought the seats. The seats are in the car. The heat is now $17.99 a month.",
    publishedAt: "2026-04-15T22:10:00Z",
    emoji: "🚗",
    gradient: "from-neon-red/40 via-ink-900 to-ink-950",
    kicker: "Tech",
    source: { name: "Axle Review", url: "https://news.google.com" },
    videoQuery: "car subscription heated seats",
    tags: ["tech", "subscription-hell", "late-stage"],
    intro:
      "A major car manufacturer has announced that heated seats — a physical feature already installed in your vehicle — will now require a $17.99 monthly subscription. Features locked behind paywalls include: steering wheel heat, adaptive headlights, and in some trims, the horn.",
    takes: [
      "Every time a car company says 'software-defined vehicle,' a single passenger spontaneously combusts from rage. This is the trade-off.",
      "You paid $48,000. The seat is right there. The warmer is right there. It's one wire. They added a paywall to a wire.",
      "At this rate, airbags will be a 90-day free trial and the rearview mirror will be $4/mo after taxes.",
    ],
    blame: [
      "The auto industry, for giving up on 'making a car' in favor of 'making an app that happens to have wheels.'",
      "The executive who said 'what if a button, but a subscription' and got a bonus for it.",
      "The firmware update that took 38 minutes and disabled cruise control. You remember which one.",
    ],
    conclusion:
      "Your frustration is not irrational, it is deeply rational. The rational response to paying for a thing twice is to feel like you are losing your mind. You are not. The car is losing its mind. The car is now an app. The app hates you.",
  },
  {
    slug: "app-update-moved-everything",
    title: "App Updates Itself and Moves Every Single Button",
    description:
      "You opened the app once. Something inside it decided you needed to learn. You did not want to learn.",
    publishedAt: "2026-04-15T18:45:00Z",
    emoji: "📱",
    gradient: "from-fuchsia-500/25 via-ink-900 to-ink-950",
    kicker: "Tech",
    source: { name: "Tech Daily", url: "https://news.google.com" },
    videoQuery: "app update redesign rage",
    tags: ["tech", "ui", "why"],
    intro:
      "A popular app has once again rolled out a 'redesign' that moves every button you use daily into a submenu hidden inside a hamburger inside a modal inside a three-dot overflow. User feedback has been described internally as 'unanimous and impolite.'",
    takes: [
      "The original app was fine. The previous redesign was fine. This new redesign is the design equivalent of rearranging someone's kitchen at 3am without telling them.",
      "They added an AI panel where the back button used to be. The AI has nothing to say. The back button was, and remains, mission critical.",
      "Fifty engineers have been employed for a year to delete your muscle memory.",
    ],
    blame: [
      "The product manager who needed something to ship. It did not need to be this.",
      "Design 'system thinking' that produced a system where you can no longer find your own settings.",
      "The release notes, which described this as 'a cleaner experience.' Cleaner for whom. Define cleaner.",
    ],
    conclusion:
      "You were not asking for this update. Nobody was. You are allowed to uninstall. You are allowed to complain. You are allowed to rant about it here for 0 tokens. Please do.",
  },
  {
    slug: "self-checkout-accuses-you-again",
    title: "Self-Checkout Machine Accuses Innocent Shopper of Theft Again",
    description:
      "You scanned the bananas. The machine does not believe you scanned the bananas. The bananas are right there.",
    publishedAt: "2026-04-15T16:20:00Z",
    emoji: "🍌",
    gradient: "from-amber-500/30 via-ink-900 to-ink-950",
    kicker: "Modern Life",
    source: { name: "Retail Report", url: "https://news.google.com" },
    videoQuery: "self checkout problems",
    tags: ["daily-rage", "tech", "retail"],
    intro:
      "A shopper scanning a routine $1.29 item at self-checkout has once again been flagged as a potential shoplifter, locked out of the machine, and forced to make eye contact with a supervisor named Patricia. This is the 11th documented incident this afternoon.",
    takes: [
      "The self-checkout is a vibe experiment. The experiment is: how long before you flinch. You flinched during bananas.",
      "The 'please wait for assistance' voice is calibrated to a specific frequency of public humiliation that nothing else in American life reaches.",
      "You are doing the cashier's job for them, paying the same price, and still being watched like you are the one who did something wrong. That is the whole bit.",
    ],
    blame: [
      "Whoever built the computer vision system. The computer has vision. The vision is aggressive.",
      "The 'unexpected item in the bagging area' voice line, which should be classified as psychological warfare.",
      "The store, for removing all but one human cashier who is already on a 30-minute break with no estimated return.",
    ],
    conclusion:
      "If you ever think, 'is it me?' — no. It is the machine. The machine has been out here for years, every day, making people feel insane, one banana at a time. Go home. Order delivery. Rage in peace.",
  },
  {
    slug: "airline-seat-selection-fee-now-fee-for-fee-2026-04-21-001",
    title: "Airline Adds a Fee to Pay the Other Fee",
    description:
      "Seat selection has a fee. The fee has a fee. Somewhere, an accountant levitated.",
    publishedAt: "2026-04-21T12:00:00Z",
    emoji: "💺",
    gradient: "from-neon-blue/25 via-ink-900 to-ink-950",
    kicker: "Travel",
    source: { name: "Wire Report", url: "https://news.google.com" },
    videoQuery: "airline seat selection fees",
    tags: ["travel", "junk-fees", "daily-rage"],
    intro:
      "A major airline has introduced a new “processing surcharge” for certain optional fees — including the fee you pay to choose a seat that is not in the airplane bathroom.",
    takes: [
      "It’s called a “surcharge” because “we’re taking your money again” tested poorly in focus groups.",
      "The fee is avoidable if you don’t pick a seat, don’t bring a bag, don’t breathe, and don’t exist.",
      "The email announcing it used the word “enhanced” three times. Enhanced for who.",
    ],
    blame: [
      "The spreadsheet that decided your knees should be monetized.",
      "The person who renamed “cost” to “value opportunity.”",
      "The entire industry for turning transportation into a loot box.",
    ],
    conclusion:
      "If you feel like you’re being nickel-and-dimed, it’s because you are. It’s not your imagination. It’s the business model. Rage responsibly. Hydrate.",
  },
  {
    slug: "smart-fridge-needs-update-to-open-2026-04-21-002",
    title: "Smart Fridge Requires a Firmware Update Before It Will Chill",
    description:
      "The fridge is online. Your groceries are not safe. The fridge is thinking about it.",
    publishedAt: "2026-04-21T11:00:00Z",
    emoji: "🧊",
    gradient: "from-fuchsia-500/20 via-ink-900 to-ink-950",
    kicker: "Tech",
    source: { name: "Tech Daily", url: "https://news.google.com" },
    videoQuery: "smart fridge update",
    tags: ["tech", "iot", "daily-rage"],
    intro:
      "In a move no human asked for, a ‘smart’ refrigerator has begun prompting owners to install a firmware update — and allegedly delaying normal operation until the update completes.",
    takes: [
      "A fridge used to have one job. Now it has a roadmap.",
      "It can display the weather, but it can’t display basic respect.",
      "If your appliance needs an account, the appliance is not for you. It’s for whoever buys your data.",
    ],
    blame: [
      "The product manager who looked at a fridge and saw ‘engagement.’",
      "The investor deck that said “recurring revenue” over “cold milk.”",
      "The update pop-up designer. There is a special place for you.",
    ],
    conclusion:
      "A refrigerator should not have opinions, ads, or a software lifecycle. It should be cold. That’s it. The future is stupid. Please scream into a pillow.",
  },
  {
    slug: "rent-payment-portal-down-on-payday-2026-04-21-003",
    title: "Rent Payment Portal Goes Down Exactly on Payday, Again",
    description:
      "The portal is down. Late fees are up. Customer support is a poem written by an AI that hates you.",
    publishedAt: "2026-04-21T10:00:00Z",
    emoji: "🏢",
    gradient: "from-amber-500/20 via-ink-900 to-ink-950",
    kicker: "Money",
    source: { name: "Housing Desk", url: "https://news.google.com" },
    videoQuery: "rent portal down late fee",
    tags: ["money", "rent", "daily-rage"],
    intro:
      "Residents across multiple buildings reported that their online rent portal became unavailable right when paychecks hit, with outages lasting long enough to trigger late fees for people who were actively trying to pay on time.",
    takes: [
      "They call it “maintenance.” It’s the kind of maintenance where only your stress gets maintained.",
      "The late fee is instant. The portal fix is “within 3–5 business days.”",
      "Paying rent shouldn’t require refreshing a webpage like you’re buying concert tickets.",
    ],
    blame: [
      "The vendor who charges your landlord and still can’t keep a website up.",
      "The fine print that says “outage does not excuse late payment.”",
      "The concept of rent as a live-service game.",
    ],
    conclusion:
      "If a system punishes you for doing the correct thing, it’s not a system — it’s a trap. Document everything. Screenshot the outage. Be annoying. It’s your money.",
  },
  {
    slug: "coffee-order-app-asks-for-tip-before-coffee-2026-04-21-004",
    title: "Coffee App Asks for a Tip Before It Has Even Made Coffee",
    description:
      "You have not received coffee. The app is already disappointed in you.",
    publishedAt: "2026-04-21T09:00:00Z",
    emoji: "☕",
    gradient: "from-neon-red/20 via-ink-900 to-ink-950",
    kicker: "Modern Life",
    source: { name: "Retail Report", url: "https://news.google.com" },
    videoQuery: "tipping screen before service",
    tags: ["daily-rage", "tipping", "money"],
    intro:
      "A popular coffee ordering app is prompting customers to tip at checkout — before the drink is made, before it is correct, and before anyone has acknowledged your existence.",
    takes: [
      "The tip prompt is not a question. It’s a dare.",
      "It’s not tipping. It’s pre-paying guilt.",
      "The screen is angled so the barista can see your choice. This is a psychological experiment.",
    ],
    blame: [
      "The owners who outsourced wages to vibes.",
      "The interface that makes ‘No Tip’ feel like an act of violence.",
      "All of us for accepting this for five straight years.",
    ],
    conclusion:
      "Tip culture isn’t your fault, but your nerves are paying the interest. Tip when you want. Don’t when you don’t. The coffee should still be coffee.",
  },
  {
    slug: "calendar-invites-accepted-by-default-2026-04-21-005",
    title: "Calendar App Starts Accepting Invites for You Like It Owns Your Life",
    description:
      "You are now attending three meetings you never agreed to. Congratulations on your new job: Professional Availability.",
    publishedAt: "2026-04-21T08:00:00Z",
    emoji: "📅",
    gradient: "from-neon-blue/20 via-ink-900 to-ink-950",
    kicker: "Work",
    source: { name: "Office Wire", url: "https://news.google.com" },
    videoQuery: "calendar invite automatically accepted",
    tags: ["work", "calendar", "tech", "daily-rage"],
    intro:
      "Users reported that an update to a popular calendar client appears to auto-add meeting invites more aggressively, turning tentative requests into full commitments without the human courtesy of asking.",
    takes: [
      "It’s not a calendar. It’s a leash with color-coding.",
      "The decline button is now hidden behind a menu labeled “Maybe later.”",
      "Every update makes your tools more confident and you less in control.",
    ],
    blame: [
      "The update that confuses “helpful” with “authoritative.”",
      "The meeting culture that treats your time like a public park.",
      "The person who scheduled a 7:30am “sync.”",
    ],
    conclusion:
      "Your calendar should not consent on your behalf. If it does, it’s broken. Turn off auto-add. Reclaim your mornings. Guard your hours like treasure.",
  },
];

export function sortOutrageNewest(a: OutrageStory, b: OutrageStory): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function latestOutrage(limit?: number): OutrageStory[] {
  const sorted = [...OUTRAGE_STORIES].sort(sortOutrageNewest);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getOutrageStory(slug: string): OutrageStory | undefined {
  return OUTRAGE_STORIES.find((s) => s.slug === slug);
}

export function getRelatedOutrage(slug: string, limit = 3): OutrageStory[] {
  return OUTRAGE_STORIES.filter((s) => s.slug !== slug)
    .sort(sortOutrageNewest)
    .slice(0, limit);
}
