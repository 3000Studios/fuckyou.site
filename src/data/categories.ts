export type CategorySlug = "work" | "life" | "tech" | "money" | "people";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "work",
    name: "Work",
    tagline: "Jobs, bosses, meetings that could've been emails.",
    blurb:
      "The 9-to-5 industrial complex, dissected with zero corporate filter. Rants about bad managers, pointless meetings, and why nobody reads the Slack announcement.",
  },
  {
    slug: "life",
    name: "Life",
    tagline: "Adulting, chores, and the tiny indignities.",
    blurb:
      "Everything life quietly stacks on top of you — dishes, laundry, 8am alarms, and pretending you're 'fine.'",
  },
  {
    slug: "tech",
    name: "Tech",
    tagline: "Gadgets, software, and the spinning wheel of doom.",
    blurb:
      "The loading spinners, the pop-ups, the 'please rate this app,' and every single product that used to just work.",
  },
  {
    slug: "money",
    name: "Money",
    tagline: "Bills, groceries, and fake 'price drops.'",
    blurb:
      "Rent, groceries, 'convenience fees,' subscription creep, and why $20 isn't $20 anymore.",
  },
  {
    slug: "people",
    name: "People",
    tagline: "Humans are the plot twist.",
    blurb:
      "The coworker who microwaves fish. The friend who replies 'K.' The driver in the left lane at 45. Yeah. That.",
  },
];

export const getCategory = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
