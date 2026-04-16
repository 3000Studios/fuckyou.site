import type { Article } from "../types";

export const article: Article = {
  slug: "tech-that-drives-everyone-crazy",
  title: "Tech That Drives Everyone Crazy (And Why It Keeps Getting Worse)",
  description:
    "Cookie banners. Two-factor loops. The app that needs an update to open. A field report from the front lines of modern technology.",
  category: "tech",
  tags: ["tech", "software", "ux", "rant"],
  publishedAt: "2026-04-08",
  author: "The Rant Desk",
  featured: true,
  hero: {
    emoji: "🖥️",
    gradient: "from-neon-blue/30 via-ink-900 to-ink-900",
    kicker: "TECH • 9 MIN READ",
  },
  tldr:
    "Software used to respect your time. Now it harvests it. Here's the greatest hits of modern tech annoyances, ranked by pure rage.",
  content: [
    {
      type: "p",
      text: "There was a time when you could just… open an app. You'd click the icon. It would open. Revolutionary. Today, opening an app is a multi-step spiritual journey involving a cookie popup, a login wall, a 'let us know you' modal, a 'rate us' nag, and a notification permission request. All this to check what time the pharmacy closes.",
    },
    {
      type: "p",
      text: "Here's the stuff that's making everyone secretly consider a flip phone.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "1. Cookie banners that won't take 'no' for an answer",
    },
    {
      type: "p",
      text: "You clicked 'reject all.' The site said 'sure!' and then opened a second, deeper menu asking you to reject them again, item by item, across 147 'advertising partners' you've never heard of. This isn't compliance. This is a psychological operation. The entire 'accept cookies' industry could be replaced with two radio buttons, and it won't be, because friction is the business model.",
    },
    {
      type: "h2",
      text: "2. Two-factor authentication that hates you specifically",
    },
    {
      type: "p",
      text: "You got the code. You typed the code. The code expired in the 3.2 seconds it took you to tab over. You requested a new code. The new code went to the phone number you haven't had since 2019. You are now on hold with a chatbot named 'Skye.' Skye doesn't know what a human is.",
    },
    {
      type: "quote",
      text: "Security used to mean 'nobody else can get in.' Now it means 'nobody can get in, including you.'",
    },
    {
      type: "h2",
      text: "3. Apps that need an update before they open",
    },
    {
      type: "p",
      text: "You opened your banking app during a medical emergency in a parking lot. It informs you, with a gentle animation, that there is a new version available. You cannot bypass this. The update is 412 MB. Your signal is two bars. You go to a competitor. This is why every banking UX team should be legally required to test their flow in a basement.",
    },
    {
      type: "h2",
      text: "4. The notification permissions prompt",
    },
    {
      type: "p",
      text: "No. No, I don't want to be notified. I opened this page to find out how to boil an egg. Why would I want push notifications from it? Who is the product manager who looked at the boiling-an-egg tutorial and said 'yeah, we need this to DM people'?",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "5. The infinite 'please rate us' popup",
    },
    {
      type: "p",
      text: "An app that has delivered my food late three times in a row has just asked me if I'd like to 'take a quick moment to rate our experience.' Yes I would. The rating is two words. You cannot display it in-app. My phone will light up the sky.",
    },
    {
      type: "h2",
      text: "6. Smart TVs that aren't smart, just slow",
    },
    {
      type: "p",
      text: "You pressed power. The TV said 'hi!' You said 'hi back.' The TV went on a two-minute monologue about sport, then showed you ads for shows you don't watch on services you don't subscribe to, then asked if you'd like to 'continue watching' something you finished six months ago. You just wanted to watch the news.",
    },
    {
      type: "h2",
      text: "7. Every captcha ever",
    },
    {
      type: "p",
      text: "Which of these nine images contains a crosswalk? The answer is: all of them, if you squint. Also: you have just spent four minutes training a self-driving car to recognize a crosswalk. You will not be paid for this. You will also not be allowed into your email.",
    },
    {
      type: "h2",
      text: "8. Search bars that refuse to search what you typed",
    },
    {
      type: "p",
      text: "You typed 'ibuprofen 200mg.' The store showed you 12 lamps, a thigh massager, a case of tuna, and 'items related to your browsing history.' You cannot find ibuprofen 200mg in a store that exists to sell ibuprofen 200mg.",
    },
    {
      type: "h2",
      text: "9. The silent auto-play",
    },
    {
      type: "p",
      text: "You're on the quiet train. You tap a news article. A man starts shouting at you about sports from a video in the corner of the screen that you can't find. You scroll. The video follows. It is now in the bottom right and it has its own close button that doesn't close. Every passenger is looking at you.",
    },
    {
      type: "h2",
      text: "10. 'We've updated our terms of service'",
    },
    {
      type: "p",
      text: "No you haven't. You've lengthened them. They are now 42 pages of 'we collect everything we legally can collect, and by opening this email you have agreed.' Nobody reads them. Everybody clicks accept. Somewhere, a legal team is cheering.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "Why it keeps getting worse",
    },
    {
      type: "p",
      text: "Because annoyance is profitable. Every dark pattern in this list converts better than its respectful counterpart. Until that stops being true, your patience is the product. The least you can do is know when you're being sold.",
    },
    {
      type: "affiliate",
      title: "The anti-annoyance starter pack",
      description:
        "Gadgets that shave 30 minutes a day off 'fighting your own stuff.'",
      items: [
        {
          name: "A password manager",
          blurb:
            "Stop resetting passwords. Resetting passwords is 40% of the modern human condition. You deserve more.",
          url: "https://www.amazon.com/s?k=password+manager",
          tag: "Security",
        },
        {
          name: "A mesh WiFi router",
          blurb:
            "Your 'smart home' isn't smart. Your WiFi is bad. Fix the actual problem.",
          url: "https://www.amazon.com/s?k=mesh+wifi+router",
          tag: "Home",
        },
        {
          name: "A fast SSD",
          blurb:
            "If your laptop has been 'thinking about opening Chrome' for six months, it's the drive. Upgrade it and watch your life come back.",
          url: "https://www.amazon.com/s?k=internal+ssd",
          tag: "Performance",
        },
      ],
    },
    {
      type: "p",
      text: "Tech was supposed to save time. Half of it now spends that time on itself. Vote with your clicks. Leave the apps that hate you.",
    },
  ],
};
