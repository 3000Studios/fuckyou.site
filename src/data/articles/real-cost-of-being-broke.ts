import type { Article } from "../types";

export const article: Article = {
  slug: "the-real-cost-of-being-broke-in-2026",
  title: "The Real Cost of Being Broke in 2026",
  description:
    "Being broke isn't cheap. It's actually the most expensive thing you can be. Here's the math nobody warns you about.",
  category: "money",
  tags: ["money", "finance", "economy", "rant"],
  publishedAt: "2026-04-06",
  author: "The Rant Desk",
  featured: true,
  trending: true,
  hero: {
    emoji: "💸",
    gradient: "from-neon-blue/20 via-ink-900 to-ink-900",
    kicker: "MONEY • 9 MIN READ",
  },
  tldr:
    "The poorer you are, the more everything costs. Not a metaphor. A receipt.",
  content: [
    {
      type: "p",
      text: "If you've ever had exactly $43.17 in your account two days before payday, you know this intuitively: broke is a tax. You pay it in fees, in time, in bad groceries, in small bad decisions that compound like bad interest. This article is not going to tell you to 'skip the latte.' You already skipped the latte. That's how we got here.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Fees: the tollbooth for having no money",
    },
    {
      type: "p",
      text: "The overdraft fee is the original scam. Your bank will let a $6 charge go through, then charge you $35 for the privilege, then charge you another $35 the next day because the first $35 put you in the red. Nobody with actual money has ever seen one of these fees. They are a subscription service for being poor.",
    },
    {
      type: "ul",
      items: [
        "Overdraft fees: $35 per incident. Average American pays them 6+ times a year. That's rent in some cities.",
        "ATM fees: $4 to touch your own money because your bank isn't 'in network.'",
        "Late payment fees: $39 for forgetting, on top of the interest you were already paying.",
        "'Convenience' fees: $3 to pay a bill online. The non-convenient option is a stamp and a prayer.",
      ],
    },
    {
      type: "h2",
      text: "Groceries: you pay more, you eat worse",
    },
    {
      type: "p",
      text: "The $10 you have today buys ramen, frozen pizza, off-brand soda, and a vague promise of heartburn. The $100 you don't have would buy rice, beans, chicken, and produce that stretches into a week of meals. Bulk is cheaper per unit. The whole point of bulk is that you have the money up front. If you don't, you pay twice: once in cash, and again in your body.",
    },
    {
      type: "quote",
      text: "Poor cooking is expensive cooking. Rich people buy rice in 25-pound sacks and call it 'wellness.'",
    },
    {
      type: "h2",
      text: "The 'it'll hold' economy",
    },
    {
      type: "p",
      text: "Poor people replace. Middle-class people repair. Rich people maintain. Your shoes wear out because you buy the $30 ones every eight months instead of the $130 ones every four years. Your tires 'hold' until they don't. The check engine light is a tarot card you can't afford to read.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Time, the currency nobody tells you about",
    },
    {
      type: "p",
      text: "You take the bus because gas is a luxury. The bus takes 45 minutes longer. That's two and a half hours a day, or about 12 hours a week, that rich people are using to sleep, exercise, or sit on the internet yelling about capitalism. You are paying $0 for that bus ride. You are also paying 12 hours.",
    },
    {
      type: "p",
      text: "Payday loans work on this principle. They charge you a week's pay so you can have that week's pay today. It looks like a favor. It is an amputation.",
    },
    {
      type: "h2",
      text: "Why 'just save money' is an insult",
    },
    {
      type: "p",
      text: "You cannot budget your way out of rent going up 18% in three years. You cannot meal prep your way past a medical bill. The finance-bro 'just invest in index funds' advice is excellent — for people who have money left over. The rest of us are solving a different problem: we're trying to stop the leak. Saving is a shape you cannot make without a bucket.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "Small moves that actually help",
    },
    {
      type: "ol",
      items: [
        "Switch to a bank with zero overdraft fees. They exist. Do this today.",
        "Kill the auto-renew subscriptions you forgot about. The average person loses $200/month this way.",
        "Freeze one credit card in a block of ice. Sounds dumb. Saves thousands.",
        "Buy the slightly better version of the one thing you use every day. Shoes. Work bag. Coffee maker.",
        "Call every service provider once a year. 'I'd like to cancel.' Watch what happens to your bill.",
      ],
    },
    {
      type: "affiliate",
      title: "Tools that pay for themselves (we hope)",
      description:
        "This isn't financial advice. This is 'stop getting squeezed' advice.",
      items: [
        {
          name: "A real budgeting app",
          blurb:
            "Not the one your bank makes. A good budgeting app is the difference between knowing where your money went and guessing.",
          url: "https://www.amazon.com/s?k=personal+finance+software",
          tag: "Budget",
        },
        {
          name: "Reusable water bottle",
          blurb:
            "Not a moral statement. A math statement. Bottled water is $2, tap water is $0.0004.",
          url: "https://www.amazon.com/s?k=reusable+water+bottle",
          tag: "Daily",
        },
        {
          name: "A slow cooker",
          blurb:
            "Six ingredients, no attention, four meals. This device pays rent by itself.",
          url: "https://www.amazon.com/s?k=slow+cooker",
          tag: "Kitchen",
        },
      ],
    },
    {
      type: "p",
      text: "None of this makes being broke fun. But knowing the tax exists makes it slightly easier to dodge. You're not bad with money. Money is bad with you.",
    },
  ],
};
