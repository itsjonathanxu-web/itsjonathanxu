import data from "./darkroom.json";

export type Light = "dawn" | "day" | "golden" | "blue" | "night";

export interface DarkroomItem {
  id: string;
  type: "photo" | "video";
  src: string;
  poster?: string;
  href?: string;
  w: number;
  h: number;
  place: string;
  color: string;
  warmth: number; // -1 cool .. 1 warm (Claude's read blended with measured colour)
  motion: number; // -1 still .. 1 moving
  light: Light;
  note: string;
}

export const LIGHTS: Light[] = ["dawn", "day", "golden", "blue", "night"];
export const LIGHT_LABELS: Record<Light, string> = { dawn: "Dawn", day: "Day", golden: "Golden", blue: "Blue hour", night: "Night" };

export const darkroomItems = data.items as DarkroomItem[];

/** Where the control's knob sits: warmth and motion, both -1..1 */
export interface Mood {
  warmth: number;
  motion: number;
}

export interface Placed {
  x: number; // card centre, px from the wall's centre
  y: number;
  w: number;
  h: number;
}

/** How far a frame is from the chosen mood; frames outside the chosen light sort last. */
export function moodDistance(item: DarkroomItem, mood: Mood, light: Light | null) {
  return Math.hypot(item.warmth - mood.warmth, item.motion - mood.motion) + (light && item.light !== light ? 4 : 0);
}

/**
 * Masonry wall grown outward from the centre into a screen-shaped rectangle. Frames closest to the mood are placed first,
 * each into whichever column slot (above or below) keeps it nearest the middle, so the best
 * matches gather in the centre and the rest ring outward into the dark.
 */
export function wallLayout(items: DarkroomItem[], mood: Mood, light: Light | null, colW: number, gap: number, aspect: number) {
  const order = items
    .map((item, k) => ({ k, d: moodDistance(item, mood, light) }))
    .sort((a, b) => a.d - b.d || a.k - b.k)
    .map((o) => o.k);

  const pitch = colW + gap;
  const cols = new Map<number, { top: number; bottom: number }>();
  // Offset alternate columns so rows never line up (the masonry look)
  const stagger = (c: number) => (((c % 3) + 3) % 3) * colW * 0.18 - colW * 0.18;
  const points: Placed[] = new Array(items.length);
  let minC = 0;
  let maxC = 0;

  for (const k of order) {
    const item = items[k];
    const ratio = Math.min(1.9, Math.max(0.62, item.w / item.h));
    const h = Math.round(colW / ratio);
    let best: { c: number; down: boolean; y: number; d: number } | null = null;

    for (let c = minC - 1; c <= maxC + 1; c++) {
      const col = cols.get(c) ?? { top: stagger(c), bottom: stagger(c) };
      const x = c * pitch;
      for (const down of [true, false]) {
        const y = down ? col.bottom + h / 2 : col.top - gap - h / 2;
        // Box distance stretched by the screen's aspect, so the wall fills a screen-shaped rectangle
        // (corners included); a little round distance breaks ties toward the middle
        const d = Math.max(Math.abs(x) / aspect, Math.abs(y)) + 0.15 * Math.hypot(x / aspect, y);
        if (!best || d < best.d) best = { c, down, y, d };
      }
    }

    const b = best!;
    const col = cols.get(b.c) ?? { top: stagger(b.c), bottom: stagger(b.c) };
    if (b.down) col.bottom += h + gap;
    else col.top -= h + gap;
    cols.set(b.c, col);
    minC = Math.min(minC, b.c);
    maxC = Math.max(maxC, b.c);
    points[k] = { x: b.c * pitch, y: b.y, w: colW, h };
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x - p.w / 2);
    maxX = Math.max(maxX, p.x + p.w / 2);
    minY = Math.min(minY, p.y - p.h / 2);
    maxY = Math.max(maxY, p.y + p.h / 2);
  }
  return { points, bounds: { minX, maxX, minY, maxY } };
}
