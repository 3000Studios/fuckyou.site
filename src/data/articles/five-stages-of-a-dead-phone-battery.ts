import type { Article } from "../types";

export const article: Article = {
  slug: "five-stages-of-a-dead-phone-battery",
  title: "The Five Stages of a Dead Phone Battery",
  description:
    "Denial at 20%. Bargaining with the brightness slider. The special grief of a dead phone at a bus stop. A complete emotional journey every phone owner has taken.",
  category: "tech",
  tags: ["tech", "phones", "battery", "humor", "rant"],
  publishedAt: "2026-10-17",
  author: "The Rant Desk",
  hero: {
    emoji: "🪫",
    gradient: "from-neon-yellow/25 via-ink-900 to-ink-900",
    kicker: "TECH • 6 MIN READ",
  },
  tldr:
    "A phone battery does not die all at once. It dies in five emotional stages, and you will experience every one of them in about forty minutes.",
  content: [
    {
      type: "p",
      text: "Psychologists have a model for grief. It has five stages. So does watching your phone die in public with no charger, and the overlap is not a coincidence. It begins, as all tragedies begin, with a number you choose not to believe: 20%. From there, the journey is fixed — denial, bargaining, anger, depression, acceptance — compressed into the time it takes to get home, which suddenly feels like an expedition your ancestors would have respected.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Stage 1: Denial (20% — 'that's basically half')",
    },
    {
      type: "p",
      text: "Twenty percent sounds like a lot. It is a fifth. People have won elections with less. So you continue exactly as before — video, maps, the brightness of a small sun — because the battery percentage is an estimate, a vibe, possibly even a lie your phone tells to keep you humble. You will not change your behavior for a vibe. This confidence lasts until the first warning appears at 10%, at which point the vibe develops legal standing.",
    },
    {
      type: "h2",
      text: "Stage 2: Bargaining (10% — the brightness slider confessional)",
    },
    {
      type: "p",
      text: "Now the negotiations begin. Brightness: down to a level where the screen is technically visible to bats. Every app: closed, including the ones you swear were draining it (it was the maps; it was always the maps). Battery saver mode: on, accepting the humiliation of the orange icon. You begin making promises. If this phone survives until I get home, I will buy the good charger. I will stop sleeping with it at 4% like a chaos gremlin. I will finally delete the screenshots folder. The phone, which cannot hear you and is at 6%, declines to negotiate.",
    },
    {
      type: "quote",
      text: "At 5%, every human becomes a battery engineer. 'It's the background app refresh,' you say, to no one, with total certainty and no evidence.",
    },
    {
      type: "h2",
      text: "Stage 3: Anger (5% — blame distribution phase)",
    },
    {
      type: "p",
      text: "The anger has many targets and all of them deserve it. The charger, which is at home, in the wall, living its best life. Past-you, who saw 40% this morning and thought 'plenty.' The phone manufacturer, whose battery claims were written by an optimist in a lab where the phone presumably sat motionless in a dark room achieving its dreams. The coffee shop, which has no free outlets, a fact you now regard as a moral failing. You send the 'my phone is dying' text — the modern equivalent of a message in a bottle — so that when you vanish mid-conversation, history records that you did not ghost anyone. The technology failed. You were failed by the technology.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Stage 4: Depression (1% — the long goodbye)",
    },
    {
      type: "p",
      text: "One percent is not a battery level. It is a countdown clock in a movie. You stop using the phone entirely and just hold it, the way you'd hold a hand. Then the screen goes black — not with ceremony, just mid-thought, the way a candle goes out — and the silence that follows is genuinely startling. No buzz. No badge. No 47 unread messages from the group chat that, an hour ago, you would have paid money to escape. You are at a bus stop. You do not know when the bus comes, because the bus lives in the phone. You know nothing, the way humans knew nothing for millennia, and it feels, specifically, like a punishment.",
    },
    {
      type: "h2",
      text: "Stage 5: Acceptance (0% — citizen of 1997)",
    },
    {
      type: "p",
      text: "And then, quietly, something unexpected: it passes. You look out the window. You watch the street do its street things. You reconstruct your route from memory and discover, with some pride, that you possess one. A stranger asks you the time and you get to say 'sorry, my phone died' and share a moment of genuine human connection about it. By the time you reach a charger, you have been a person from 1997 for forty minutes, and the strangest part — the part nobody warns you about — is that it was almost nice. Almost. You plug in the phone. It wakes. Forty-seven messages arrive at once. The cycle, like all great cycles, begins again at 20%.",
    },
    {
      type: "affiliate",
      title: "Never grieve again: the prepared kit",
      description:
        "For people who have completed the five stages enough times to buy their way out of stage one.",
      items: [
        {
          name: "A pocket power bank",
          blurb:
            "Two full charges in your bag and the five stages become a story you tell about other people.",
          url: "https://www.amazon.com/s?k=portable+power+bank",
          tag: "Power",
        },
        {
          name: "A braided fast-charge cable",
          blurb:
            "The cable that lives in your bag permanently, so 'the charger is at home' stops being a plot point.",
          url: "https://www.amazon.com/s?k=braided+usb+c+cable",
          tag: "Cable",
        },
        {
          name: "A car charger with two ports",
          blurb:
            "For the passenger-princess emergencies: their phone is dying and somehow it is your responsibility now.",
          url: "https://www.amazon.com/s?k=dual+port+car+charger",
          tag: "Car",
        },
      ],
    },
    {
      type: "p",
      text: "The battery will die again. That part is physics. But the five stages are optional — they only run at full length on people who left the house at 40% believing in the goodness of the world. Charge the phone. Pack the bank. Skip the grief.",
    },
  ],
};
