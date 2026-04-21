import type { Article } from "../types";

export const article: Article = {
  slug: "your-to-do-list-is-a-ponzi-scheme",
  title: "Your To‑Do List Is a Ponzi Scheme",
  description:
    "Every time you cross something off, three new tasks appear. This is not “productivity.” This is a hydra with a calendar.",
  category: "life",
  tags: ["life", "adulting", "productivity", "burnout", "rant"],
  publishedAt: "2026-04-20",
  author: "The Rant Desk",
  hero: {
    emoji: "🧾",
    gradient: "from-amber-500/25 via-ink-900 to-ink-900",
    kicker: "LIFE • 7 MIN READ",
  },
  tldr:
    "Your to-do list is not a moral scoreboard. It’s a queue. You’re allowed to close the tab, pick one real thing, and stop negotiating with infinite chores.",
  content: [
    {
      type: "p",
      text: "The to-do list started as a helpful note. It has evolved into a living document that judges you. It follows you between apps. It syncs. It pings. It has a due date for “call dentist,” which is funny because the dentist also has a due date for your sanity.",
    },
    {
      type: "p",
      text: "The scam is subtle: the list pretends it will end. It will not end. It will only mutate.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Why it keeps growing",
    },
    {
      type: "ul",
      items: [
        "Life creates maintenance tasks. Maintenance tasks don’t feel like progress, so you avoid them, and then they multiply.",
        "Every system you create requires upkeep. Your habit tracker becomes another habit to track.",
        "Your brain treats “remember this” as a background process that burns RAM all day. The list is you freeing memory, not failing.",
      ],
    },
    {
      type: "h2",
      text: "A better rule: One Big Thing",
    },
    {
      type: "p",
      text: "Pick one thing that moves your life forward today. Not ten micro-errands. One thing. Do it early. Do it badly if you have to. Then everything else is optional maintenance.",
    },
    {
      type: "quote",
      text: "A day with one real win beats a day of fifty tiny appeasements.",
    },
    {
      type: "h2",
      text: "The list isn’t your boss",
    },
    {
      type: "p",
      text: "If you use the list like a courtroom, you will always lose. If you use it like a menu, you can make a decision and move. Your value is not measured in checkboxes. Your nervous system doesn’t care how organized your Notion is.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "affiliate",
      title: "Anti-hydra tools",
      description:
        "Stuff that makes “adulting” slightly less like a boss fight.",
      items: [
        {
          name: "A whiteboard (yes, really)",
          blurb:
            "A physical surface has one killer feature: it can’t spawn infinite tabs.",
          url: "https://www.amazon.com/s?k=whiteboard",
          tag: "Simple",
        },
        {
          name: "A kitchen timer",
          blurb:
            "Set 20 minutes. Do one annoying thing. Stop. You’re not a machine.",
          url: "https://www.amazon.com/s?k=kitchen+timer",
          tag: "Focus",
        },
        {
          name: "A sleep mask",
          blurb:
            "If you’re exhausted, your to-do list is just a list of ways to suffer.",
          url: "https://www.amazon.com/s?k=sleep+mask",
          tag: "Recovery",
        },
      ],
    },
    {
      type: "p",
      text: "Your list will still be there tomorrow. That’s the point. It’s not a finish line. It’s a tool. Use it, then close it.",
    },
  ],
};

