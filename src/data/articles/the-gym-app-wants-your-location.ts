import type { Article } from "../types";

export const article: Article = {
  slug: "the-gym-app-wants-your-location",
  title: "The Gym App Wants Your Location (And That's Somehow Normal Now)",
  description:
    "You tried to scan a QR code to enter a building. The app asked for Bluetooth, location, motion sensors, and your firstborn.",
  category: "tech",
  tags: ["tech", "privacy", "apps", "rant"],
  publishedAt: "2026-04-19",
  author: "The Rant Desk",
  hero: {
    emoji: "📍",
    gradient: "from-neon-blue/25 via-ink-900 to-ink-900",
    kicker: "TECH • 6 MIN READ",
  },
  tldr:
    "Basic services are being turned into data-collection funnels. The worst part is how quickly we got used to it. You can say no — and you should.",
  content: [
    {
      type: "p",
      text: "I went to the gym to lift heavy things and forget I can read. Instead, I was greeted by a sign that said: “DOWNLOAD THE APP TO ENTER.” Not “to track workouts.” Not “for rewards.” To enter the physical building. Like I’m checking into a server.",
    },
    {
      type: "p",
      text: "The app asked for location. Fine, maybe for “nearby clubs.” Then it asked for Bluetooth. Fine, maybe for the door lock. Then it asked for motion sensors. Then it asked for notification permissions. Then it asked if it could “find devices on your local network.” For what. The squat rack?",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "The new business model: your attention, your data, your patience",
    },
    {
      type: "p",
      text: "The door is no longer a door. It’s a conversion funnel. It’s a data pipeline. It’s a login screen with a handle. The “gym” is now a subscription service that also occasionally contains weights.",
    },
    {
      type: "h2",
      text: "What to do (without turning into a prepper)",
    },
    {
      type: "ol",
      items: [
        "Say no to permissions you don’t need. If the door works without them, you were right.",
        "Use “While using the app,” not “Always,” unless it literally cannot function.",
        "Delete apps you only need once. Install, use, delete. Treat it like a disposable cup.",
        "If you can’t enter without a surveillance app, consider whether you’re paying for a gym or for a digital leash.",
      ],
    },
    {
      type: "quote",
      text: "If a flashlight app needs location, it’s not a flashlight app. It’s a business plan.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "affiliate",
      title: "Privacy-ish upgrades",
      description:
        "Not perfect. Just slightly less cursed.",
      items: [
        {
          name: "A hardware security key",
          blurb:
            "Safer logins without turning your phone into a permanent password hostage.",
          url: "https://www.amazon.com/s?k=security+key+usb",
          tag: "Security",
        },
        {
          name: "A phone privacy screen protector",
          blurb:
            "For the part of modern life where strangers keep reading over your shoulder.",
          url: "https://www.amazon.com/s?k=privacy+screen+protector",
          tag: "Everyday",
        },
      ],
    },
    {
      type: "p",
      text: "You don’t have to opt into every permission because a button flashed. You’re allowed to be difficult. The app is being difficult first.",
    },
  ],
};

