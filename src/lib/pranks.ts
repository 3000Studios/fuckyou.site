export type PrankScenarioId =
  | "pizza-impossible"
  | "hoa-violation"
  | "wrong-number-romance"
  | "tech-support-nightmare"
  | "dentist-reminder"
  | "uber-driver-lost"
  | "survey-call"
  | "gym-membership"
  | "lost-cat"
  | "subscription-renewal";

export type PrankScenario = {
  id: PrankScenarioId;
  title: string;
  caller: string;
  emoji: string;
  intensity: 1 | 2 | 3;
  tagline: string;
  description: string;
  tokens: number;
  lines: (ctx: {
    name: string;
    topic: string;
    city: string;
  }) => { speaker: "Caller" | "Victim" | "VO"; text: string; pause?: number }[];
};

const pranks: PrankScenario[] = [
  {
    id: "pizza-impossible",
    title: "The Impossible Pizza Order",
    caller: "A Deeply Confused Pizza Manager",
    emoji: "🍕",
    intensity: 1,
    tagline: "We received your 47 pizzas. Is this a family event?",
    description:
      "An overly polite pizza manager calls to confirm an absurd, impossible-to-cancel pizza order that your friend definitely did not make.",
    tokens: 2,
    lines: ({ name, city }) => [
      {
        speaker: "Caller",
        text: `Hi, is this ${name}? This is Marco from Papa Delfino's in ${city}. I'm just calling to confirm your order of forty-seven pizzas?`,
        pause: 500,
      },
      {
        speaker: "Caller",
        text: "Yes, the note says 'no crust, extra crust, light cheese, all cheese, and one pepperoni cut into the shape of your ex.'",
      },
      {
        speaker: "Caller",
        text: "We're already halfway through prep. The dough is rising. There is no stopping the dough, sir.",
      },
      {
        speaker: "Caller",
        text: "Your card on file ending in 0420 has been charged nine hundred and sixty-three dollars and a feeling.",
      },
      {
        speaker: "Caller",
        text: "The driver's name is Kyle. Kyle has three kids and one of them is still at the store. Please plan accordingly.",
      },
    ],
  },
  {
    id: "hoa-violation",
    title: "HOA Violation: Personal Vibes",
    caller: "Karen from the HOA (Karen-ier than usual)",
    emoji: "📋",
    intensity: 2,
    tagline: "Multiple neighbors have reported your general energy.",
    description:
      "A seething HOA representative cites your friend for increasingly absurd neighborhood violations.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Hello ${name}, this is Karen from the Homeowners Association. I'm calling regarding three violations filed against you this week.`,
      },
      {
        speaker: "Caller",
        text: "Number one. A neighbor reports you were seen laughing too loudly while putting out the recycling. The recycling day is Wednesday. You laughed on a Tuesday.",
      },
      {
        speaker: "Caller",
        text: "Number two. Your lawn is the wrong shade of green. It's described here as, quote, 'smug green.'",
      },
      {
        speaker: "Caller",
        text: "Number three. Your overall vibe was described by three separate neighbors as, quote, 'not HOA-approved.'",
      },
      {
        speaker: "Caller",
        text: "You have 48 hours to address these concerns or we will be forced to tow your personality.",
      },
    ],
  },
  {
    id: "wrong-number-romance",
    title: "Wrong Number, Wrong Feelings",
    caller: "Someone Who Definitely Dialed the Wrong Human",
    emoji: "💘",
    intensity: 1,
    tagline: "You don't know them. They know you. Emotionally.",
    description:
      "A strangely emotional caller who is 100% certain they are speaking to their soulmate, despite all evidence.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Babe? Babe, it's me. Don't hang up. I know it's been a while and I know you said 'never call this number,' but ${name}, I can't keep pretending.`,
      },
      {
        speaker: "Caller",
        text: "I drove past the gas station. OUR gas station. The one with the slushie machine that only does half-blue? And I cried. In the car. On a Tuesday.",
      },
      {
        speaker: "Caller",
        text: "I know you said I was 'emotionally a two-year-old with Wi-Fi.' That was a fair point. I'm working on it. I've been journaling. To you. About you.",
      },
      {
        speaker: "Caller",
        text: "Look, I just need to know one thing. Do I still keep the cat? Answer carefully. The cat and I are a package deal now.",
      },
    ],
  },
  {
    id: "tech-support-nightmare",
    title: "Aggressive Tech Support",
    caller: "A 'Technician' With Zero Patience",
    emoji: "🖥️",
    intensity: 2,
    tagline: "Sir/ma'am, your Wi-Fi is morally wrong.",
    description:
      "A tech support agent with a chip on his shoulder calls about increasingly unhinged 'issues' with your friend's internet.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Hello ${name}, this is Derek from Internet. Yes, the whole internet. I'm calling because your router is, quote, 'being disrespectful.'`,
      },
      {
        speaker: "Caller",
        text: "Our system flagged your household for excessive buffering during a crucial moment in a show you weren't even that into.",
      },
      {
        speaker: "Caller",
        text: "I'm going to need you to unplug your router, smell it, plug it back in, and apologize out loud. Yes, out loud. It needs to hear you.",
      },
      {
        speaker: "Caller",
        text: "Before we proceed, I need you to confirm your password for verification. Please say it slowly and with full eye contact with a nearby houseplant.",
      },
    ],
  },
  {
    id: "dentist-reminder",
    title: "Overly Personal Dentist",
    caller: "A Dentist Who Has Notes",
    emoji: "🦷",
    intensity: 1,
    tagline: "Your teeth have been talking about you.",
    description:
      "A dental receptionist calls to confirm an appointment and then casually reveals everything your teeth have been saying behind your back.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Hi ${name}, this is Brenda from Dr. Molar's office. I'm confirming your 10:15 appointment on Thursday.`,
      },
      {
        speaker: "Caller",
        text: "Just a heads up — the dentist did want me to pass along that your bottom-left incisor called the office twice this week to complain about you.",
      },
      {
        speaker: "Caller",
        text: "It used the word 'reckless.' It used the phrase, quote, 'they know what they did with that popcorn.'",
      },
      {
        speaker: "Caller",
        text: "Please bring a support person. Your teeth have things they want to say and we believe in a full family mediation.",
      },
    ],
  },
  {
    id: "uber-driver-lost",
    title: "Uber Driver Who Took a Wrong Turn (Into a Feeling)",
    caller: "A Driver Having a Moment",
    emoji: "🚗",
    intensity: 2,
    tagline: "I'm outside. Not your house, but emotionally, yours.",
    description:
      "The rideshare driver your friend didn't order is outside, and going through something.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Hey ${name}, it's your driver. I'm outside. I think. I'm outside a house. There is a house. It might be yours.`,
      },
      {
        speaker: "Caller",
        text: "I want to say before we start this trip, I think you made the right call splitting the appetizer. I really do.",
      },
      {
        speaker: "Caller",
        text: "Anyway, I'm rating you five stars before you even get in. Hope that's cool. I've already told my wife about you. Her name is also wife.",
      },
      {
        speaker: "Caller",
        text: "If you come outside right now we can talk about your life choices on the way. We have a 14 minute ride. That's plenty.",
      },
    ],
  },
  {
    id: "survey-call",
    title: "The World's Most Aggressive Survey",
    caller: "A Robocall With a Chip on Its Server",
    emoji: "📞",
    intensity: 3,
    tagline: "Press 1 if you are better than your last Google review.",
    description:
      "An increasingly confrontational automated survey from a company your friend has never heard of.",
    tokens: 3,
    lines: ({ name }) => [
      {
        speaker: "VO",
        text: `Hello. This is an automated survey for ${name}. Do not hang up. We already know where you live. For legal reasons that was a joke.`,
      },
      {
        speaker: "VO",
        text: "Press 1 if you believe you are, overall, a cool person. Press 2 to be realistic.",
      },
      {
        speaker: "VO",
        text: "On a scale from 1 to 10, with 10 being 'genuinely loved by their group chat,' how do you rate yourself?",
      },
      {
        speaker: "VO",
        text: "Your answer has been logged and shared with three people you used to work with. We don't need a reason.",
      },
      {
        speaker: "VO",
        text: "Thank you for your time. This call will continue to exist in your memory for no compensation.",
      },
    ],
  },
  {
    id: "gym-membership",
    title: "The Gym Misses You",
    caller: "A Personal Trainer, Grieving",
    emoji: "🏋️",
    intensity: 2,
    tagline: "The treadmill hasn't been the same since you stopped lying to it.",
    description:
      "A concerned gym representative calls to check on your friend's 'wellness journey,' which the gym has kept very detailed notes on.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Hi ${name}, this is Chad from Ironhearts Fitness. We just wanted to call because, uh, it's been 14 months since you used your membership.`,
      },
      {
        speaker: "Caller",
        text: "We kept charging. We kept believing. Every month, one of us would say, 'Today. Today is the day they come back.' They never did.",
      },
      {
        speaker: "Caller",
        text: "Your locker? Still locked. Your towel? Still folded. Your hopes? Let's not go there.",
      },
      {
        speaker: "Caller",
        text: "The rowing machine has been asking about you by name. Not in a healthy way.",
      },
    ],
  },
  {
    id: "lost-cat",
    title: "Your Cat Has Been Writing Letters",
    caller: "A Very Formal Animal Shelter",
    emoji: "🐈",
    intensity: 1,
    tagline: "We have your cat. The cat has things to say.",
    description:
      "A shelter calls to inform your friend that their cat has been found, and has prepared a statement.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Good afternoon, ${name}, this is Harmony Pines Animal Shelter. A cat matching your cat's description has arrived with a handwritten letter.`,
      },
      {
        speaker: "Caller",
        text: "We are obligated by law to read it to you. I'll do my best. Here goes. 'Dear idiot.'",
      },
      {
        speaker: "Caller",
        text: "'I left because you called me a good boy on October 4th at 9:47pm and I am a woman of the highest regard.'",
      },
      {
        speaker: "Caller",
        text: "'Attached is a list of your worst qualities. I have cc'd your mother. Do not look for me. I will look for you.' End of letter.",
      },
    ],
  },
  {
    id: "subscription-renewal",
    title: "Subscription You Definitely Signed Up For",
    caller: "A Suspicious 'Billing' Department",
    emoji: "💳",
    intensity: 2,
    tagline: "Your monthly Vibes+ Premium subscription is auto-renewing.",
    description:
      "A billing rep confirms the renewal of a subscription your friend did not sign up for, and absolutely cannot cancel.",
    tokens: 2,
    lines: ({ name }) => [
      {
        speaker: "Caller",
        text: `Hello ${name}, this is automated billing for Vibes Plus Premium Elite. Your annual subscription is renewing today for six hundred and forty-two dollars.`,
      },
      {
        speaker: "Caller",
        text: "Our records show you signed up on a Saturday night at 11:47pm in 2023. You were, quote, 'really feeling it.'",
      },
      {
        speaker: "Caller",
        text: "To cancel, please say the phrase 'I no longer crave peace' three times into the phone. This is non-negotiable.",
      },
      {
        speaker: "Caller",
        text: "Unfortunately, we can only process cancellations in person, at our only office, which is in the kitchen of someone named Greg. Greg is not home.",
      },
    ],
  },
];

export const PRANK_SCENARIOS = pranks;

export function getPrankScenario(id: string): PrankScenario | undefined {
  return pranks.find((p) => p.id === id);
}
