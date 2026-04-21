import type { HourlyDrop } from "./hourly";

type Stored = {
  read: Record<string, true>;
};

const KEY = "fys_messages_v1";

function load(): Stored {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { read: {} };
    const data = JSON.parse(raw) as Stored;
    return { read: data.read || {} };
  } catch {
    return { read: {} };
  }
}

function save(next: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function isRead(id: string): boolean {
  if (typeof window === "undefined") return false;
  const s = load();
  return !!s.read[id];
}

export function markRead(id: string) {
  const s = load();
  s.read[id] = true;
  save(s);
}

export function markAllRead(items: Array<{ id: string }>) {
  const s = load();
  for (const it of items) s.read[it.id] = true;
  save(s);
}

export type MessageItem =
  | ({ type: "hourly" } & HourlyDrop)
  | {
      type: "system";
      id: string;
      title: string;
      body: string;
      createdAt: string;
      mood: "ember" | "ice" | "toxic";
    };

