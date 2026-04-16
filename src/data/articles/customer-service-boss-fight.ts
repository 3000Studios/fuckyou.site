import type { Article } from "../types";

export const article: Article = {
  slug: "why-customer-service-is-a-boss-fight",
  title: "Why Customer Service Is a Boss Fight",
  description:
    "Phone trees. Hold music. The chatbot named Sarah who does not exist. A strategy guide for beating the final level of modern support.",
  category: "life",
  tags: ["life", "customer-service", "rant", "strategy"],
  publishedAt: "2026-04-13",
  author: "The Rant Desk",
  hero: {
    emoji: "☎️",
    gradient: "from-neon-red/30 via-ink-900 to-ink-900",
    kicker: "LIFE • 8 MIN READ",
  },
  tldr:
    "Modern customer service is designed to make you give up. Knowing that is half the fight. The other half is knowing the cheat codes.",
  content: [
    {
      type: "p",
      text: "You just wanted to cancel. That's it. One button, one sentence, one transaction. Instead, you've been on hold for 27 minutes listening to the same 12-second loop of flute music, pressing 4, then 2, then 0, then yelling 'REPRESENTATIVE' at your kitchen ceiling like a man possessed. Welcome, traveler, to the final boss of modern life: customer service.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "The system is working. For them.",
    },
    {
      type: "p",
      text: "Every minute you spend on hold is a minute you might give up, go make dinner, and forget about the refund. The phone tree isn't broken. It's a filter. It's designed to sort 'people who will fight for $38' from 'people who will not.' If you've ever rage-quit a cancellation flow at 9:47pm: congratulations, you were successfully sorted.",
    },
    {
      type: "h2",
      text: "The chatbot is a decoy",
    },
    {
      type: "p",
      text: "'Sarah' is not a real employee. 'Sarah' is a pattern-matching script that has been trained on 400 other people like you, and she knows the fastest way to get rid of you is to offer a 10% loyalty discount and hope you close the tab. Do not negotiate with Sarah. Sarah does not have authority. Sarah is a speed bump.",
    },
    {
      type: "quote",
      text: "The first level of support exists so you will leave before reaching the second level, which exists to make sure you leave before reaching the level with actual authority.",
    },
    {
      type: "h2",
      text: "Cheat codes for the boss fight",
    },
    {
      type: "ol",
      items: [
        "Call right when they open. No queue. No wait. No cortisol.",
        "Say 'cancel account' or 'billing dispute' to skip three menus. 'Cancel' is magic.",
        "If a rep says they can't help, ask: 'What team can?' You will be transferred rather than denied.",
        "Be pleasant. Always. Even through gritted teeth. The rep did not design the tree; they are trapped in it too.",
        "Ask for a case number before ending any call. Without it, the call did not happen.",
        "Email confirmations of phone conversations. Paper > promises.",
      ],
    },
    {
      type: "h2",
      text: "The 'retention specialist' tier",
    },
    {
      type: "p",
      text: "When you say you're cancelling and actually mean it, you will, at some point, be transferred to a person whose entire job is to give you things for free so you don't leave. This is the retention specialist. This person has more authority than anyone you've spoken to. This is the boss you were looking for.",
    },
    {
      type: "p",
      text: "They have the ability to: waive a fee, halve your bill for 12 months, credit you for the last outage, and add free months. Do not refuse these offers politely. Either you actually want the service at the new price, or you're done. There is no third option. Do not let them upsell you a 'loyalty' tier you didn't ask for.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "The escalation script",
    },
    {
      type: "p",
      text: "If you've been polite, if you have a case number, and if you are still stuck: say these exact words. 'I've been a customer for X years. I've spent X hours on this issue. I'd like to escalate this to a supervisor before I file a complaint with my state's consumer protection division.' Ninety percent of the time, this unlocks a level of support that was never on the menu.",
    },
    {
      type: "h2",
      text: "The nuclear option",
    },
    {
      type: "p",
      text: "For truly stuck issues, try: a chargeback through your bank, a Better Business Bureau complaint, a post on the company's own social media (public, not a DM), or contacting the executive email (usually 'ceo@company.com' or similar — the emails of VPs are surprisingly Google-able). None of these are subtle. All of them work.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "A script you can literally copy",
    },
    {
      type: "p",
      text: "Hi, this is [Name]. I'm calling about [issue]. I've been a customer since [year]. I need this resolved today and I'd like a case number at the end of this call. What's the fastest way to make that happen?",
    },
    {
      type: "p",
      text: "That's the whole script. It signals: you know what you want, you're going to be reasonable, and you're not leaving. The rep will relax. You will relax. The call will be shorter.",
    },
    {
      type: "affiliate",
      title: "Tools for surviving the call",
      description:
        "Items that make the 47-minute hold bearable.",
      items: [
        {
          name: "Bluetooth headset",
          blurb:
            "Hands free while you fold laundry, wash dishes, or stress-bake. The call gets shorter if you're distracted.",
          url: "https://www.amazon.com/s?k=bluetooth+headset",
          tag: "Audio",
        },
        {
          name: "A real notebook",
          blurb:
            "Write the name, time, case number, and promise. Paper survives chat windows closing.",
          url: "https://www.amazon.com/s?k=spiral+notebook",
          tag: "Notes",
        },
        {
          name: "A bottomless water bottle",
          blurb:
            "You are going to yell. You will need hydration. This is not a joke.",
          url: "https://www.amazon.com/s?k=large+water+bottle",
          tag: "Hydration",
        },
      ],
    },
    {
      type: "p",
      text: "You are not bad at customer service. Customer service is bad at you. Bring a pen.",
    },
  ],
};
