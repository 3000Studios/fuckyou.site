import type { Article } from "../types";

export const article: Article = {
  slug: "meetings-that-should-have-been-emails",
  title: "Meetings That Should Have Been Emails: A Taxonomy",
  description:
    "The Status Recital. The Meeting to Schedule a Meeting. The Deck Reading. A field guide to the five meeting species that waste your week — and the email that replaces each one.",
  category: "work",
  tags: ["work", "meetings", "productivity", "email", "rant"],
  publishedAt: "2026-10-17",
  author: "The Rant Desk",
  hero: {
    emoji: "📧",
    gradient: "from-neon-green/25 via-ink-900 to-ink-900",
    kicker: "WORK • 7 MIN READ",
  },
  tldr:
    "A meeting is a group of people paying full price — in hours — for information that costs almost nothing to write down. Most meetings are invoices nobody questioned.",
  content: [
    {
      type: "p",
      text: "Somewhere right now, eight people are sitting in a room (or a grid of video rectangles) listening to one person read aloud information that all eight of them could have read silently in four minutes. This has been happening, in every office on Earth, for decades, and it keeps happening because nobody's job title is 'person who cancels the meeting.' Consider this article a field guide: five species of meeting that should have been emails, how to identify them in the wild, and what the email version would have said.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Species 1: The Status Recital",
    },
    {
      type: "p",
      text: "Identification: everyone goes around and says what they did this week while everyone else composes their own statement instead of listening. Nothing is decided. Nothing is unblocked. The meeting exists so that the information is 'shared,' but information read aloud at talking speed, once, with no pause button, is information destroyed. The email version: a shared doc where each person writes three lines by Thursday — what shipped, what's next, what's stuck. Read time: four minutes. Bonus feature nobody appreciates enough: it's searchable forever, unlike Dave's verbal report, which evaporated somewhere around 'synergy.'",
    },
    {
      type: "h2",
      text: "Species 2: The Meeting to Schedule a Meeting",
    },
    {
      type: "p",
      text: "Identification: the agenda is 'aligning on next steps,' the next step turns out to be another meeting, and the most concrete artifact produced is a calendar invitation. This species is an ouroboros — a conference-room snake eating its own tail: it consumes an hour and produces only another invitation. The email version is one paragraph: 'Here's the decision we need. Here are the two options. Reply with your pick by Friday; silence counts as agreement with option A.' Watch how fast a decision that 'needed a meeting' materializes when the alternative is being counted as a yes.",
    },
    {
      type: "quote",
      text: "Half of all meetings exist so that a decision can be delayed at group scale, with snacks.",
    },
    {
      type: "h2",
      text: "Species 3: The Deck Reading",
    },
    {
      type: "p",
      text: "Identification: a presenter reads their own slides to the room, word for word, including the bullet points the room is also reading, at the exact speed of reading. This is an audiobook of a document, performed live, at eight salaries per hour. The email version is radical in its simplicity: send the deck. Add a three-line summary at the top saying what it concludes and what, if anything, you need from the reader. People who have questions will ask questions — those questions, notably, will be better than the ones asked by a room trying to prove it was awake.",
    },
    { type: "ad", slot: "in-article" },
    {
      type: "h2",
      text: "Species 4: The Brainstorm With No Note-Taker",
    },
    {
      type: "p",
      text: "Identification: energy is high, ideas are flying, the whiteboard is covered — and two weeks later, nobody can reconstruct a single thing that was said, including whether anything was decided. A brainstorm without a written record isn't a brainstorm; it's improv theater with a catering budget. The email version is an asynchronous thread: pose the question on Monday, let people contribute ideas in writing through Wednesday (written brainstorms consistently surface the quiet people's ideas, which live ones steamroll), then one human synthesizes. The ideas survive. That is the entire difference.",
    },
    {
      type: "h2",
      text: "Species 5: The FYI Ambush",
    },
    {
      type: "p",
      text: "Identification: you're invited 'just so you're in the loop.' You have no role, no decision, no input requested. You are, functionally, a carbon copy with a pulse — but instead of receiving the two-line summary an actual CC would get, you donate an hour of your life as a witness. The email version is the two-line summary. 'Looping you in' is what email was invented for. It is, etymologically and spiritually, a loop made of mail.",
    },
    {
      type: "h2",
      text: "The three-question test (run it before accepting anything)",
    },
    {
      type: "ol",
      items: [
        "Is a decision actually being made in this meeting? If no decision exists, the meeting is a delivery mechanism — and email delivers better.",
        "Does the decision require live debate, or just informed input? Input can be written. Only genuine disagreement needs a room.",
        "Could each attendee's contribution fit in three written lines? Status, updates, FYIs, and approvals all fit in three lines. Send the lines.",
      ],
    },
    {
      type: "p",
      text: "None of this is an argument against meetings. A hard problem, a real argument, a team that needs to think together out loud — those deserve a room and a whiteboard and everyone's full attention. The argument is against spending the room on things paper does better. Save meetings for the conversations that are actually conversations, and the next time a calendar invite arrives with no agenda and 'sync' in the title, you will know exactly which species you're looking at — and exactly which email would set it free.",
    },
  ],
};
