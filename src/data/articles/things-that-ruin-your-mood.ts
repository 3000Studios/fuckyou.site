import type { Article } from "../types";

export const article: Article = {
  slug: "things-that-instantly-ruin-your-mood",
  title: "Things That Instantly Ruin Your Mood (And Why You Can't Shake Them)",
  description:
    "Stepping on a wet sock. The email that says 'as discussed.' The car in front of you that brakes for no reason. A full catalog.",
  category: "life",
  tags: ["life", "mood", "humor", "rant"],
  publishedAt: "2026-04-14",
  author: "The Rant Desk",
  hero: {
    emoji: "😠",
    gradient: "from-neon-red/25 via-ink-900 to-ink-900",
    kicker: "LIFE • 6 MIN READ",
  },
  tldr:
    "Your brain is wired to dwell on small bad things. Knowing that won't stop it, but at least you'll be annoyed on purpose.",
  content: [
    {
      type: "p",
      text: "You could have the best day of your life — sun shining, coffee perfect, an email from a friend — and one tiny thing will walk in and drag you 40 feet backwards emotionally. A wet sock. A smudge on your glasses. One surprise hair in the sink. Why? Because your brain evolved to keep you alive, not comfortable, and 'noticing the bad thing immediately' is how your ancestors didn't get eaten.",
    },
    {
      type: "p",
      text: "Herewith, a definitive list of modern tiny horrors.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Physical sensations that end you",
    },
    {
      type: "ul",
      items: [
        "Stepping in a wet spot on the kitchen floor while wearing socks.",
        "A hair in your mouth that you cannot find with your fingers.",
        "The exact moment a contact lens folds in on itself.",
        "A single tag left in the neck of a new shirt, sawing.",
        "That one splinter you cannot see but can feel every time you grip anything.",
      ],
    },
    {
      type: "h2",
      text: "Sounds that end you",
    },
    {
      type: "ul",
      items: [
        "The refrigerator beep that means you left the door open. You did not. It beeps anyway.",
        "Cutlery scraping a plate.",
        "Someone typing on a mechanical keyboard three chairs down.",
        "A passive-aggressive throat clear.",
        "The 4:58pm Slack ding.",
      ],
    },
    {
      type: "quote",
      text: "You can hear the sound of an email arriving in your sleep. Evolution did not plan for this.",
    },
    {
      type: "h2",
      text: "People things that end you",
    },
    {
      type: "ol",
      items: [
        "'Can I ask you a question?' (they are already asking)",
        "'As we discussed…' (you didn't)",
        "'I'll be quick.' (they will not)",
        "'Don't take this the wrong way…' (they are about to ensure that you do)",
        "'Can you stay late?' (forty-one minutes before end of day)",
      ],
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Tiny domestic betrayals",
    },
    {
      type: "ul",
      items: [
        "Putting your glass down and missing the coaster by one inch, over water.",
        "Finishing the last of the coffee and looking up at no one who made more.",
        "Opening a snack drawer and finding an empty box someone put back 'in case.'",
        "Dropping toast, butter-side. Always butter-side. Always.",
        "The exact square millimeter of ceiling you can see water starting to stain, right there.",
      ],
    },
    {
      type: "h2",
      text: "Why it sticks for 45 minutes after",
    },
    {
      type: "p",
      text: "Psychologists call it the 'negativity bias.' One bad thing hits your brain about 5x harder than a good thing. You could have been told 'great job' by your boss five minutes ago and you will still be thinking about the wet sock at lunch. This is not a moral failing. This is an adaptation from when your ancestors had to remember which river the crocodile lived in.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "What actually un-ruins the mood",
    },
    {
      type: "ol",
      items: [
        "Name it out loud. 'That really annoyed me.' Saying it defuses it, every time.",
        "Physically move. Stand up. Walk to a different room. Mood is 70% context.",
        "Cold water on your wrists. Works for anger the way deep breathing works for panic.",
        "Do not punish everyone around you. Your bad mood is not their payment plan.",
        "Eat. You are half-angry and half-hungry. Always.",
      ],
    },
    {
      type: "affiliate",
      title: "Small fixes for small miseries",
      description:
        "Sometimes you can buy your way out of a tiny daily problem. Here are a few.",
      items: [
        {
          name: "A good pair of slippers",
          blurb:
            "Wet socks are avoidable. Slippers are 80% of the cure. Worth more than any $40 decoration in your house.",
          url: "https://www.amazon.com/s?k=memory+foam+slippers",
          tag: "Home",
        },
        {
          name: "Lens wipes",
          blurb:
            "The constant smudge is a mood killer. Buy a box. Keep them everywhere. Seriously.",
          url: "https://www.amazon.com/s?k=lens+wipes",
          tag: "Daily",
        },
        {
          name: "Earplugs that don't look dumb",
          blurb:
            "Modern filter earplugs soften the world without muting it. Your ears are adults; treat them.",
          url: "https://www.amazon.com/s?k=filter+earplugs",
          tag: "Sound",
        },
      ],
    },
    {
      type: "p",
      text: "You can't avoid tiny bad things. You can, however, notice that they are the actual sum of a bad day — not some grand tragedy. Fix the sock. The mood follows.",
    },
  ],
};
