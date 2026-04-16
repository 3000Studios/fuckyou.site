import type { Article } from "../types";

export const article: Article = {
  slug: "the-silent-rage-of-slow-wifi",
  title: "The Silent Rage of Slow WiFi",
  description:
    "You pay for 1 gigabit. You get 3 megabits in the kitchen. There is a name for the feeling you're having, and it is not 'patience.'",
  category: "tech",
  tags: ["tech", "wifi", "internet", "rant"],
  publishedAt: "2026-04-12",
  author: "The Rant Desk",
  hero: {
    emoji: "📶",
    gradient: "from-neon-blue/30 via-ink-900 to-ink-900",
    kicker: "TECH • 7 MIN READ",
  },
  tldr:
    "Slow WiFi isn't your ISP most of the time. It's your router, its placement, and the 27 devices quietly draining it behind your back.",
  content: [
    {
      type: "p",
      text: "You pay a premium for 'gigabit.' You run a speed test and it says 812 megabits. You feel briefly powerful. Then you walk twelve feet to the couch and your stream buffers. In that instant, something primal awakens. You consider buying a longer ethernet cable. You consider moving. You consider becoming a person who reads paper books, at least spiritually.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Your 'gigabit' does not reach your couch. It never did.",
    },
    {
      type: "p",
      text: "The number on your bill is the speed between the internet and your modem. Everything after the modem is your problem. That includes: the wall your router is hiding behind, the microwave operating on the same 2.4GHz band, your neighbor's six access points, and the physical laws of electromagnetism. You are fighting all of these at once. You will not win on vibes.",
    },
    {
      type: "h2",
      text: "Reasons your WiFi is slow, ranked by how much it will embarrass you",
    },
    {
      type: "ol",
      items: [
        "Your router is in a closet. The signal is being eaten by drywall and spite.",
        "You have not rebooted the router since the last administration.",
        "A smart TV you forgot exists is currently downloading a 6 GB update.",
        "Your laptop is on 2.4GHz when it could be on 5GHz. Two entirely different WiFi lives.",
        "Your roommate is torrenting something we won't name here.",
      ],
    },
    {
      type: "quote",
      text: "If your router has been working 'just fine' for six years, it hasn't. You've just lowered your expectations that slowly.",
    },
    {
      type: "h2",
      text: "The 2.4 vs 5 GHz thing, plainly",
    },
    {
      type: "p",
      text: "2.4GHz goes far, through walls, and is slow. 5GHz goes less far, stops at walls, and is fast. Modern routers broadcast both under the same name and politely let your devices choose. Your devices are lazy teenagers and often choose wrong. If you have the option to split the networks and name them 'YourName' and 'YourName_5G,' do it. Connect your laptop and phone to the 5 network. Let your smart bulbs stay on the slow lane where they belong.",
    },
    {
      type: "h2",
      text: "Router placement: stop hiding it",
    },
    {
      type: "p",
      text: "Your router is not furniture. It is a tiny sun. It wants to be in the middle of the room, on a shelf, with nothing on top of it. The closet behind three walls and a filing cabinet is the worst place on earth for a router. Move it six feet. Test your WiFi again. Be mildly horrified at the difference.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "The 'smart home' is draining you",
    },
    {
      type: "p",
      text: "Every smart plug, smart bulb, smart thermostat, smart doorbell, smart scale, smart toothbrush — they're all on your network. They ping the cloud constantly. They are not the reason your stream buffers. But they are the reason your router's CPU is warm and its 'connected devices' count is now 38. Most home routers start to wheeze around 25 active devices. Enterprise gear you can buy for $150 handles hundreds.",
    },
    {
      type: "h2",
      text: "ISPs are guilty, but not of what you think",
    },
    {
      type: "p",
      text: "Your ISP is probably delivering the speed they promised. Their failure is renting you a router that was outdated when it shipped. If you've been using the box they gave you for more than three years: it's not your ISP, it's the box. Buy your own. The break-even is about eleven months.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "A 30-minute WiFi audit",
    },
    {
      type: "ul",
      items: [
        "Unplug the router for 90 seconds. Plug back in. Wait five minutes. Test.",
        "Run a speed test at the router, then at the couch, then at the bedroom. Write down the numbers.",
        "Move the router. Try again. Rejoice.",
        "Open your router admin page, look at the device list, disconnect anything you don't recognize.",
        "Split your 2.4 and 5 networks. Put your important devices on 5.",
      ],
    },
    {
      type: "affiliate",
      title: "Stuff that actually fixes WiFi",
      description:
        "Because 'restart the router' is only half a solution.",
      items: [
        {
          name: "A modern mesh system",
          blurb:
            "Two or three nodes around your house. Same network name, no dead zones, no shouting.",
          url: "https://www.amazon.com/s?k=mesh+wifi+system",
          tag: "Mesh",
        },
        {
          name: "A WiFi 6 router",
          blurb:
            "If your house is small and one strong router is enough, make sure it's WiFi 6 (or 6E). Anything older is spiritually discontinued.",
          url: "https://www.amazon.com/s?k=wifi+6+router",
          tag: "Router",
        },
        {
          name: "A long flat ethernet cable",
          blurb:
            "For the one device that absolutely must never buffer. Your PS5 will thank you.",
          url: "https://www.amazon.com/s?k=flat+ethernet+cable",
          tag: "Cable",
        },
      ],
    },
    {
      type: "p",
      text: "Slow WiFi is one of the most fixable problems in modern life. Ninety percent of the cure is caring enough to open the admin panel. Go fight for your gigabit.",
    },
  ],
};
