export type HourlyDrop = {
  id: string;
  title: string;
  body: string;
  mood: "ember" | "ice" | "toxic";
  createdAt: string; // ISO hour stamp
};

function hourStamp(d: Date): string {
  const iso = new Date(d.getTime()).toISOString();
  return iso.slice(0, 13) + ":00:00Z";
}

function seeded(n: number) {
  let x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

const TITLES = [
  "Hourly Drop: the world is loud",
  "Hourly Drop: you deserve better UX",
  "Hourly Drop: capitalism did this",
  "Hourly Drop: breathe, then rage",
  "Hourly Drop: a tiny rebellion",
  "Hourly Drop: your sanity check",
];

const BODIES = [
  "If your day feels like a bug report that keeps getting reopened: it is. File it anyway. Loudly.",
  "Reminder: you are not lazy. You're under-designed. Your environment has a terrible UI.",
  "You can be kind and still set boundaries. You can be polite and still say, 'no, actually.'",
  "When everything is urgent, nothing is. Pick one thing. Do it. Let the rest burn quietly.",
  "Your brain is not a subscription. Stop renting out your attention for free.",
  "The best revenge is a small win that you can repeat tomorrow without hating yourself.",
];

const MOODS: HourlyDrop["mood"][] = ["ember", "ice", "toxic"];

export function getHourlyDrop(now = new Date()): HourlyDrop {
  const stamp = hourStamp(now);
  const n = Math.floor(new Date(stamp).getTime() / 3600000);
  const a = Math.floor(seeded(n) * TITLES.length);
  const b = Math.floor(seeded(n + 11) * BODIES.length);
  const m = MOODS[Math.floor(seeded(n + 3) * MOODS.length)];
  return {
    id: `drop_${n}`,
    title: TITLES[a],
    body: BODIES[b],
    mood: m,
    createdAt: stamp,
  };
}

export function msUntilNextHour(now = new Date()): number {
  const next = new Date(now.getTime());
  next.setMinutes(60, 0, 0);
  return Math.max(250, next.getTime() - now.getTime());
}

