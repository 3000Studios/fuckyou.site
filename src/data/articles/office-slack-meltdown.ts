import type { Article } from "../types";

export const article: Article = {
  slug: "office-slack-meltdown",
  title: "The Office Slack Meltdown: A Field Guide to Corporate Panic",
  description:
    "One emoji reaction, one misunderstood thread, and suddenly you’re in a meeting called “Alignment.” Here’s how office chat becomes a slow-motion disaster.",
  category: "work",
  tags: ["work", "slack", "meetings", "office", "rant"],
  publishedAt: "2026-04-21",
  author: "The Rant Desk",
  trending: true,
  hero: {
    emoji: "💬",
    gradient: "from-neon-red/25 via-ink-900 to-ink-900",
    kicker: "WORK • 8 MIN READ",
  },
  tldr:
    "Corporate chat should be a tool. Instead it’s a courtroom, a rumor mill, and a place where a thumbs-up can start a war. This is how to survive it with your dignity mostly intact.",
  content: [
    {
      type: "p",
      text: "Office chat was supposed to make work faster. It did. It also made feelings faster. There is now a written record of every tone you didn’t intend, every joke that landed wrong, and every ‘quick question’ that showed up at 5:31pm like a raccoon at your trash can.",
    },
    {
      type: "p",
      text: "Somewhere between the third ‘friendly reminder’ and the seventh ‘circling back,’ Slack stops being communication and becomes surveillance with stickers.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "The Four Stages of a Slack Meltdown",
    },
    {
      type: "h3",
      text: "1) The innocent message",
    },
    {
      type: "p",
      text: "It starts harmless: “Hey team — quick thought.” That’s the spark. That’s the match. That’s the first domino. The message is vague, optimistic, and absolutely doomed.",
    },
    {
      type: "h3",
      text: "2) The public correction",
    },
    {
      type: "p",
      text: "Someone replies in-thread with the energy of a substitute teacher: “Just to clarify…” They do not clarify. They litigate. Now the whole channel is watching two adults roleplay a performance review.",
    },
    {
      type: "quote",
      text: "Slack doesn’t create conflict. It just gives conflict a timestamp and a search bar.",
    },
    {
      type: "h3",
      text: "3) The reaction emoji incident",
    },
    {
      type: "p",
      text: "A coworker adds 👀. Nobody knows what it means. It might mean “I saw this.” It might mean “I disagree.” It might mean “I am about to forward this to Legal.” Your heart rate spikes anyway. This is modern work.",
    },
    {
      type: "h3",
      text: "4) The meeting invite",
    },
    {
      type: "p",
      text: "The calendar invite arrives. Title: “Alignment.” Agenda: blank. Attendees: your manager, their manager, and one person you’ve never spoken to who somehow has the power to make you update a spreadsheet until you die.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "How to not get spiritually deleted in a channel",
    },
    {
      type: "ul",
      items: [
        "If it’s sensitive, go 1:1. If it’s complicated, go async. If it’s emotional, go voice.",
        "Don’t correct people in public unless you’re correcting math or safety.",
        "Use fewer words. The longer your message, the more it looks like a manifesto.",
        "When you’re mad, wait 10 minutes. Slack will still be there. Regret will also still be there.",
      ],
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "The real problem",
    },
    {
      type: "p",
      text: "Slack became the place where people do politics because it’s easier than doing clarity. When leadership doesn’t provide rules, the channel invents them. When priorities are fuzzy, the loudest thread becomes the priority. When nobody feels safe, everyone communicates like they’re being cross-examined.",
    },
    {
      type: "affiliate",
      title: "Survive the chat era",
      description:
        "Small upgrades that reduce the daily cognitive tax of modern work.",
      items: [
        {
          name: "Noise-cancelling headphones",
          blurb:
            "The only effective boundary some offices will respect: physical silence.",
          url: "https://www.amazon.com/s?k=noise+cancelling+headphones",
          tag: "Focus",
        },
        {
          name: "A mechanical keyboard",
          blurb:
            "If you’re going to type “per my last message” anyway, at least make it satisfying.",
          url: "https://www.amazon.com/s?k=mechanical+keyboard",
          tag: "Setup",
        },
        {
          name: "A decent desk lamp",
          blurb:
            "You can’t fix corporate panic, but you can fix the lighting while it happens.",
          url: "https://www.amazon.com/s?k=desk+lamp",
          tag: "Home office",
        },
      ],
    },
    {
      type: "p",
      text: "Slack meltdowns are not a personal failing. They’re what happens when a workplace replaces leadership with notifications. Protect your peace. Mute the channel. Live another day.",
    },
  ],
};

