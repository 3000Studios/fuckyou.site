import type { Article } from "../types";

export const article: Article = {
  slug: "top-10-things-that-make-you-want-to-quit-your-job",
  title: "Top 10 Things That Make You Want to Quit Your Job (Ranked by Rage)",
  description:
    "A frustratingly accurate ranking of the everyday office offenses that push perfectly sane adults to draft resignation letters in the Notes app.",
  category: "work",
  tags: ["work", "rant", "office", "burnout", "remote"],
  publishedAt: "2026-04-02",
  author: "The Rant Desk",
  featured: true,
  trending: true,
  hero: {
    emoji: "💼",
    gradient: "from-neon-red/30 via-ink-900 to-ink-900",
    kicker: "WORK • 10 MIN READ",
  },
  tldr:
    "Your job probably isn't 'bad.' It's a collection of 37 tiny things that each, individually, make you want to launch your laptop into the sun. Here are the worst ten.",
  content: [
    {
      type: "p",
      text: "There's a specific moment — somewhere between the third reschedule of the 'quick sync' and a Slack ping that just says 'thoughts?' — when your body physically remembers it has the legal right to walk out and become a goat farmer. This post is for that moment.",
    },
    {
      type: "p",
      text: "We surveyed no one. We just listened to every person in our lives complain for the last year and stack-ranked it. If you work for a paycheck, you will recognize at least eight of these. If you recognize all ten, open a new tab and update your resume. We'll wait.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "10. 'This meeting could have been an email'",
    },
    {
      type: "p",
      text: "The ancient curse. Forty-five minutes of your life, six people on mute, one person whose cat keeps walking on the keyboard, and a single decision that could've been typed in six words. Multiply this by your career and you will find that you have spent more time in meetings than you've spent sleeping next to the person you love.",
    },
    {
      type: "h2",
      text: "9. The Slack ping that just says 'hey'",
    },
    {
      type: "p",
      text: "No context. No question. Just 'hey' — followed by typing indicators that start, stop, and start again while your cortisol does a full interval workout. By the time the actual message arrives, you've imagined four firings, two restructures, and a short sabbatical.",
    },
    {
      type: "h2",
      text: "8. Being praised in public for something you did three weeks ago…",
    },
    {
      type: "h3",
      text: "…while being silently loaded up with a new deadline.",
    },
    {
      type: "p",
      text: "The classic manager two-step. They say 'amazing job' with a smile, then slide 'hey, would love your eyes on this by end of day' into your DMs. Congratulations. Your reward for working is more work.",
    },
    {
      type: "h2",
      text: "7. The 'we're a family here' speech",
    },
    {
      type: "quote",
      text: "Families don't do performance reviews. Families don't have a 90-day probationary period. Families can't lay you off via Zoom.",
    },
    {
      type: "p",
      text: "Any workplace that calls itself a family is quietly hoping you'll do one of two things: work late for free, or not ask for a raise. If your 'family' is run by HR and has a termination clause, it is in fact a job. Which is fine. Just be honest about it.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "6. The Monday all-hands that pretends last week didn't happen",
    },
    {
      type: "p",
      text: "Remember the thing that broke on Friday at 4:57pm? The thing everyone panic-patched over the weekend? It will not be mentioned. Instead, someone from marketing will present a deck with the phrase 'renewed focus on synergy' and you will feel your soul detach from your body in real time.",
    },
    {
      type: "h2",
      text: "5. 'Per my last email'",
    },
    {
      type: "p",
      text: "Corporate English for 'I have explained this to you twice already and I am now about to stop being polite.' If you receive this, you have lost the thread. If you send this, you are one bad sleep away from snapping. We've all been on both sides. Nobody's proud of it.",
    },
    {
      type: "h2",
      text: "4. Performance review season",
    },
    {
      type: "ul",
      items: [
        "Rate yourself in fourteen dimensions, none of which are your actual job.",
        "Write three paragraphs about your 'growth areas,' which is HR for 'weaknesses.'",
        "List five accomplishments. You did forty. You cannot remember any of them under pressure.",
        "Receive feedback written by a manager who hasn't looked at your work since Q2.",
        "Get a raise that does not match inflation. Be thanked for it.",
      ],
    },
    {
      type: "h2",
      text: "3. Return-to-office emails written like they're doing you a favor",
    },
    {
      type: "p",
      text: "You survived a pandemic, built an entire home office, proved you could do the work in pajamas, and now you're being told to come back to commute traffic because 'collaboration happens best in person' — i.e., the VP misses the coffee machine. The email is always signed 'with excitement.' Nobody is excited.",
    },
    {
      type: "h2",
      text: "2. Software that fights you",
    },
    {
      type: "p",
      text: "The time tracker that logs you out every 45 minutes. The expense tool with 14 mandatory fields for a $7 Uber. The SSO that signs you in, signs you out, and then pretends you never existed. None of this has anything to do with the job you were hired to do. All of it is between you and the job you were hired to do.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "1. The feeling that none of this actually matters",
    },
    {
      type: "p",
      text: "This is the big one. The quiet horror that wakes you up at 3:04am. You ship the feature, you hit the OKR, you close the ticket — and by Thursday the company pivots and the ticket is deleted. The mortgage is real. The paycheck is real. But the work keeps getting renamed, re-scoped, and re-owned until it starts to feel like you're digging holes just to fill them back in.",
    },
    {
      type: "p",
      text: "If that's where you are right now: you're not lazy. You're not ungrateful. You're just paying attention. The good news is, burnout is a signal, not a verdict. You are allowed to want better.",
    },
    { type: "hr" },
    {
      type: "h2",
      text: "What actually helps (small things, not a TED Talk)",
    },
    {
      type: "ol",
      items: [
        "Block two hours a day for deep work. Put 'focus' on your calendar. Decline anything that tries to land inside it.",
        "Separate your work computer from your life computer, even if they're the same device — different browser profiles count.",
        "Write down what you actually did each week. Not what the ticket system thinks you did. You.",
        "Take the PTO. All of it. They will not give it back to you as a bonus.",
        "Update your resume on the good days, not the bad ones. Future you wants options.",
      ],
    },
    {
      type: "affiliate",
      title: "Gear that quietly saved our sanity",
      description:
        "We're not telling you to buy your way out of burnout. We're telling you that a good pair of headphones has saved more careers than HR ever has.",
      items: [
        {
          name: "Noise-cancelling headphones",
          blurb:
            "The 'please do not speak to me right now' helmet. Worth every cent on open-office days.",
          url: "https://www.amazon.com/s?k=noise+cancelling+headphones",
          tag: "Focus",
        },
        {
          name: "A real desk chair",
          blurb:
            "Your spine is not a 'standing on-call' kind of spine. Get the ergonomic one before the chiropractor appointment.",
          url: "https://www.amazon.com/s?k=ergonomic+office+chair",
          tag: "Posture",
        },
        {
          name: "A proper planner",
          blurb:
            "One analog place where Jira cannot follow you. Surprisingly, this works.",
          url: "https://www.amazon.com/s?k=weekly+planner",
          tag: "Control",
        },
      ],
    },
    {
      type: "p",
      text: "If this hit: good. You're not crazy, you're employed. Share it with the one coworker who would get it.",
    },
  ],
};
