import type { Article } from "../types";

export const article: Article = {
  slug: "why-mondays-feel-illegal",
  title: "Why Mondays Feel Illegal (A Scientific Investigation)",
  description:
    "It's not in your head. There are real, documented reasons Monday feels like a crime against humanity. Here's the case file.",
  category: "life",
  tags: ["life", "mondays", "rant", "sleep"],
  publishedAt: "2026-04-09",
  author: "The Rant Desk",
  trending: true,
  hero: {
    emoji: "😩",
    gradient: "from-neon-red/25 via-ink-900 to-ink-900",
    kicker: "LIFE • 6 MIN READ",
  },
  tldr:
    "Your body is on weekend time. The calendar doesn't care. That mismatch is a low-grade jet lag, every week of your life.",
  content: [
    {
      type: "p",
      text: "You open your eyes on Monday and your first complete sentence is 'absolutely not.' Your bed is warmer than it's ever been. Your phone is furious. The world is demanding. You haven't moved yet and you're already behind. This is not a character flaw. This is physics.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "1. Social jet lag is a real medical term",
    },
    {
      type: "p",
      text: "Sleep scientists have a name for what you do on weekends: delayed sleep phase. You stay up later Friday and Saturday, you sleep in Sunday, and by Sunday night your internal clock has quietly drifted 90 minutes west. Then on Sunday night at 11pm you set an alarm for 6:30am. Your body thinks it's 5am in another time zone. You are not tired. You are jet-lagged. Without the vacation.",
    },
    {
      type: "h2",
      text: "2. The Sunday scaries are anticipatory grief",
    },
    {
      type: "p",
      text: "Around 4pm on Sunday, your brain starts doing inventory: unanswered emails, unfinished laundry, the meeting you have no slide deck for. This is not anxiety, technically. This is your prefrontal cortex drafting the week's worries so Monday morning you can hit the ground panicking. Useful? No. Automatic? Extremely.",
    },
    {
      type: "quote",
      text: "Sunday at 7pm is the most honest hour of the week. The weekend lied to you. Monday is going to lie to you. Sunday is the one telling the truth.",
    },
    {
      type: "h2",
      text: "3. You had fun and now you're paying for it",
    },
    {
      type: "p",
      text: "On Saturday you ate food that required five napkins. On Sunday you had two glasses of wine that turned into four. You didn't move enough, or you moved too much, or both. Your body is in cleanup mode, and cleanup mode is called 'Monday.'",
    },
    {
      type: "h2",
      text: "4. Your commute is an ambush",
    },
    {
      type: "p",
      text: "There is a specific flavor of rage reserved for Monday traffic. Everybody else on the road is also running late, also under-caffeinated, and also emotionally unprepared. The same highway that was 'fine' on Thursday is now a wind tunnel of brake lights. You did not age well over the weekend, and neither did the infrastructure.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "5. The inbox has been composting",
    },
    {
      type: "p",
      text: "47 unread emails. Three of them are important. Forty-four are from newsletters you don't remember signing up for and a 'quick question' from the person who does not know what 'quick' means. Opening this inbox before coffee is an act of psychological self-harm.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "How to make Monday slightly less criminal",
    },
    {
      type: "ol",
      items: [
        "Go to bed Sunday at the same time you go to bed on a work night. It's not fun. It's the only thing that actually works.",
        "Lay out Monday's outfit, lunch, and keys on Sunday. Past-you is nicer than future-you.",
        "Don't open your email before you open a window. Sunlight first. Cortisol second.",
        "The first thing on your Monday list should be stupidly easy. You need a win, not a challenge.",
        "Drink water before coffee. Your brain is a raisin.",
      ],
    },
    {
      type: "affiliate",
      title: "Monday survival kit",
      description:
        "Small, cheap things that turn Monday from a cliff into a ramp.",
      items: [
        {
          name: "A sunrise alarm clock",
          blurb:
            "Actual light in your eyes before an actual alarm in your ears. Sleep scientists love this. You will too.",
          url: "https://www.amazon.com/s?k=sunrise+alarm+clock",
          tag: "Sleep",
        },
        {
          name: "A good travel mug",
          blurb:
            "Coffee that stays hot on your commute. You'd be amazed how much this improves a Monday.",
          url: "https://www.amazon.com/s?k=insulated+travel+mug",
          tag: "Coffee",
        },
        {
          name: "A weekly meal planner",
          blurb:
            "Decide Sunday. Execute Monday. Remove at least one decision from the worst morning of the week.",
          url: "https://www.amazon.com/s?k=meal+prep+containers",
          tag: "Meals",
        },
      ],
    },
    {
      type: "p",
      text: "Mondays are not a moral failure. They're a scheduling problem we all agreed to. You're doing fine. Go drink water.",
    },
  ],
};
