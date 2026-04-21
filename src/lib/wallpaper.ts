import { MEDIA, type MediaCredit } from "./media";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pickWallpaper(key: string): MediaCredit {
  const idx = MEDIA.length === 0 ? 0 : hash(key) % MEDIA.length;
  return MEDIA[idx] || MEDIA[0]!;
}

