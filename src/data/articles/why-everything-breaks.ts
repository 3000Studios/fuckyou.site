import type { Article } from "../types";

export const article: Article = {
  slug: "why-everything-breaks-when-you-need-it-most",
  title: "Why Everything Breaks When You Need It Most (It's Not Bad Luck)",
  description:
    "Your printer dies the morning of the deadline. Your car won't start the day of the interview. There's actually a reason, and you're going to hate it.",
  category: "life",
  tags: ["life", "murphys-law", "bad-luck", "rant"],
  publishedAt: "2026-04-04",
  author: "The Rant Desk",
  featured: true,
  trending: true,
  hero: {
    emoji: "💥",
    gradient: "from-neon-red/30 via-ink-900 to-ink-900",
    kicker: "LIFE • 8 MIN READ",
  },
  tldr:
    "It's not the universe. It's probability, neglect, and the fact that you only notice the thing exists when it stops working.",
  content: [
    {
      type: "p",
      text: "You were fine. You were so fine. Coffee in one hand, presentation deck in the other, and exactly 22 minutes to print it out before the meeting. And then — of course — the printer makes the noise. You know the noise. It's the noise printers make right before they tell you 'there is a paper jam.' There is not a paper jam. There has never been a paper jam. There will never be a paper jam. The printer is lying to you for sport.",
    },
    {
      type: "p",
      text: "This is not bad luck. It's something worse: it's predictable. Here's why.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "1. You only notice things when they break",
    },
    {
      type: "p",
      text: "Your router has been sitting in that corner for four years doing one job. You have walked past it 2,000 times. You never once thought 'I love you, router.' You did not send it a birthday card. Your relationship was one-sided. So when it finally gives up at 8:55am on a Monday, you experience it as betrayal. It's not. The router was always mortal. You were just in denial.",
    },
    {
      type: "p",
      text: "This is the first rule of 'why does this always happen to me?' You don't notice the 364 days a thing works. You notice the one day it doesn't. Over a decade, your memory turns into a greatest-hits album of catastrophic inconveniences, and you genuinely start to believe the world is out to get you. It isn't. The world is mostly asleep.",
    },
    {
      type: "h2",
      text: "2. You put pressure on things you never stress-test",
    },
    {
      type: "p",
      text: "When do you use the printer? Only when it matters. When do you use the fire extinguisher? Only when you're on fire. When do you actually need your backup hard drive? Only after the main one just coughed. These objects live a peaceful, unstressed life for months, and then one day you show up with a deadline, a storm, or a spilled latte, and you ask them to perform. They are out of practice. You are not.",
    },
    {
      type: "quote",
      text: "Nothing that works ninety percent of the time is reliable. It's just convenient, ten percent away from ruining your week.",
    },
    {
      type: "h2",
      text: "3. Software updates love an audience",
    },
    {
      type: "p",
      text: "Windows does not schedule a mandatory two-hour update when you're watching Netflix on the couch. It schedules it for the exact minute you sit down to finish your tax return. MacOS decides it needs a restart when you're three breaths away from hitting Send on the most important email of your quarter. This isn't a conspiracy. It's just: you use your computer the most when you need it the most. And software updates are triggered by use. Every 'why now?' is really 'because now is when you're here.'",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "4. Cheap stuff holds on just long enough to betray you",
    },
    {
      type: "p",
      text: "There's a specific pain that comes from something breaking two weeks after the warranty ends. That's not a coincidence, but it's also not black magic. It's called 'planned obsolescence' and it's basically the engineering principle that a $19 toaster has a $19 toaster's worth of life in it. If you want a thing to last, you have to pay for the version that says so. Otherwise you are renting it and calling it owning.",
    },
    {
      type: "h2",
      text: "5. You never did the boring thing",
    },
    {
      type: "p",
      text: "The laundry machine didn't 'break.' You never cleaned the filter. The car didn't 'die.' You ignored the battery-shaped warning light for eleven months. The fridge didn't 'just go out.' The coils behind it have enough dust to host a small ecosystem. The thing that looks like sudden failure is almost always the final shrug from something you were quietly ignoring. I say this as a person currently ignoring three of these.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "So what actually helps",
    },
    {
      type: "ul",
      items: [
        "Do everything a day early. Your past self will hate this. Your future self will light a candle in their honor.",
        "Own a backup of the boring thing: phone charger, HDMI cable, a pen, a second pair of contacts.",
        "When something works, write down that it works. Maintenance is love, and love is unglamorous.",
        "Do not buy the cheapest option for the thing you use every day. Buy the cheapest option for the thing you use once a year.",
        "If a device gives you a warning light, treat it like a sick friend, not a nagging roommate.",
      ],
    },
    {
      type: "affiliate",
      title: "Backups for the inevitable",
      description:
        "A small shopping list for people who are tired of being surprised by physics.",
      items: [
        {
          name: "A reliable surge protector",
          blurb:
            "Your $1,500 monitor plugged into a $4 power strip is a decision you're going to remember.",
          url: "https://www.amazon.com/s?k=surge+protector",
          tag: "Electronics",
        },
        {
          name: "A portable battery",
          blurb:
            "For when your phone dies at 3% in an Uber you can't find. It has happened to all of us.",
          url: "https://www.amazon.com/s?k=portable+charger",
          tag: "On the Go",
        },
        {
          name: "A small tool kit",
          blurb:
            "One tiny tool kit prevents 80% of domestic panics. Worth its weight in frustration avoided.",
          url: "https://www.amazon.com/s?k=home+tool+kit",
          tag: "Home",
        },
      ],
    },
    {
      type: "p",
      text: "The universe isn't picking on you. It's just… loudly indifferent. The good news? That's something you can plan around.",
    },
  ],
};
