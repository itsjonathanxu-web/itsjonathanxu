import data from "./darkroom.json";
import picks from "./darkroom-picks.json";

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
  hue: number; // 0 warm (pink, red) .. 1 cool (blue, violet), measured from pixels
  lum: number; // 0 dark .. 1 bright, measured
  sat: number;
  warmth: number; // Claude's read, -1 cool .. 1 warm
  motion: number;
  light: Light;
  note: string;
}

/** A frame's place on the colour map: x 0 warm .. 1 cool, y 0 light .. 1 dark */
export interface MapPoint {
  x: number;
  y: number;
}

const raw = data.items as DarkroomItem[];

// Brightness by rank, so the light-to-dark axis is evenly filled (most frames are moody and dark)
const lumRank = new Map(
  [...raw].sort((a, b) => b.lum - a.lum).map((item, r) => [item.id, raw.length > 1 ? r / (raw.length - 1) : 0.5])
);

// Colour is half true hue, half rank: true enough that the cool side is genuinely blue, spread
// enough that the crowded oranges don't squeeze everything else into a corner
const hueRank = new Map(
  [...raw].sort((a, b) => a.hue - b.hue).map((item, r) => [item.id, raw.length > 1 ? r / (raw.length - 1) : 0.5])
);

export const darkroomItems = raw;

export function mapPoint(item: DarkroomItem): MapPoint {
  return { x: 0.5 * item.hue + 0.5 * (hueRank.get(item.id) ?? 0.5), y: lumRank.get(item.id) ?? 0.5 };
}

/** Distance on the colour map; brightness counts a little less than colour. */
export function mapDistance(item: DarkroomItem, sel: MapPoint) {
  const p = mapPoint(item);
  return Math.hypot(p.x - sel.x, (p.y - sel.y) * 0.8);
}

const SELECT_RADIUS = 0.2;
const MIN_SELECTED = 18;

/** Frames inside the chosen part of the map: nothing from the opposite side ever shows. */
export function selectItems(items: DarkroomItem[], sel: MapPoint | null) {
  if (!sel) return items.map((_, k) => k);
  const ranked = items.map((item, k) => ({ k, d: mapDistance(item, sel) })).sort((a, b) => a.d - b.d);
  const inside = ranked.filter((r) => r.d <= SELECT_RADIUS);
  // Sparse corners of the map still get a handful: the nearest ones
  return (inside.length >= MIN_SELECTED ? inside : ranked.slice(0, MIN_SELECTED)).map((r) => r.k);
}

export interface Placed {
  x: number; // card centre, px from the wall's centre
  y: number;
  w: number;
  h: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const cardHeight = (item: DarkroomItem, colW: number) => Math.round(colW / Math.min(1.9, Math.max(0.62, item.w / item.h)));

function boundsOf(points: Map<number, Placed>): Bounds {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points.values()) {
    minX = Math.min(minX, p.x - p.w / 2);
    maxX = Math.max(maxX, p.x + p.w / 2);
    minY = Math.min(minY, p.y - p.h / 2);
    maxY = Math.max(maxY, p.y + p.h / 2);
  }
  return points.size ? { minX, maxX, minY, maxY } : { minX: 0, maxX: 0, minY: 0, maxY: 0 };
}

/**
 * Everything at once, laid out as the colour map itself: columns run warm (left) to cool (right)
 * like a rainbow, and each column runs light (top) to dark (bottom).
 */
export function spectrumLayout(items: DarkroomItem[], colW: number, gap: number, aspect: number) {
  const pitch = colW + gap;
  const avgH = items.reduce((s, i) => s + cardHeight(i, colW) + gap, 0) / Math.max(1, items.length);
  const cols = Math.max(1, Math.round(Math.sqrt((aspect * items.length * avgH) / pitch)));
  const byHue = items.map((_, k) => k).sort((a, b) => mapPoint(items[a]).x - mapPoint(items[b]).x);
  const per = Math.ceil(byHue.length / cols);
  const points = new Map<number, Placed>();

  for (let c = 0; c < cols; c++) {
    const column = byHue.slice(c * per, (c + 1) * per).sort((a, b) => mapPoint(items[a]).y - mapPoint(items[b]).y);
    const total = column.reduce((s, k) => s + cardHeight(items[k], colW) + gap, 0) - gap;
    // Alternate columns sit a little lower, for the staggered masonry look
    let y = -total / 2 + (c % 2 ? colW * 0.2 : 0);
    for (const k of column) {
      const h = cardHeight(items[k], colW);
      points.set(k, { x: (c - (cols - 1) / 2) * pitch, y: y + h / 2, w: colW, h });
      y += h + gap;
    }
  }
  return { points, bounds: boundsOf(points) };
}

const pickRank = picks as Record<string, number>;

/** The opening overview: each project's strongest frames, picked by Claude (scripts/darkroom/curate.mjs). */
export function overviewItems(items: DarkroomItem[]) {
  return items.map((_, k) => k).filter((k) => pickRank[items[k].id]);
}

/**
 * The overview wall: the very best frames take the middle, and every card is chosen to differ from
 * its neighbours (another project, another colour), so similar shots never stack up.
 */
export function overviewLayout(items: DarkroomItem[], order: number[], colW: number, gap: number, aspect: number) {
  const rank = (k: number) => pickRank[items[k].id] ?? 9;
  const pitch = colW + gap;
  const left = [...order].sort((a, b) => rank(a) - rank(b) || a - b);
  const placed: { k: number; p: Placed }[] = [];
  const near = (x: number, y: number, h: number) =>
    placed.filter(({ p }) => Math.abs(p.x - x) <= pitch * 1.5 && Math.abs(p.y - y) <= (p.h + h) / 2 + colW * 0.6);
  return growLayout(items, colW, gap, aspect, (x, y, h) => {
    const around = near(x, y, h);
    let best = 0;
    let bestScore = -Infinity;
    // Only look at the strongest few left, so quality still runs from the centre outward
    for (let j = 0; j < Math.min(left.length, 14); j++) {
      const k = left[j];
      let score = -j * 0.04 - rank(k) * 0.05;
      for (const { k: n, p } of around) {
        const closeness = 1 - Math.min(1, Math.hypot(p.x - x, p.y - y) / (pitch * 2));
        if (items[n].place === items[k].place) score -= 3 * closeness + 1;
        const a = mapPoint(items[n]);
        const b = mapPoint(items[k]);
        score += Math.min(0.5, Math.hypot(a.x - b.x, a.y - b.y)) * closeness;
        if (items[n].type === "video" && items[k].type === "video") score -= closeness;
      }
      if (score > bestScore) [best, bestScore] = [j, score];
    }
    return left.splice(best, 1)[0];
  }, left.length, (k, p) => placed.push({ k, p }));
}

/**
 * A selection, grown outward from the centre into a screen-shaped rectangle: the closest matches
 * take the middle and the rest ring outward.
 */
export function clusterLayout(items: DarkroomItem[], order: number[], sel: MapPoint, colW: number, gap: number, aspect: number) {
  const sorted = [...order].sort((a, b) => mapDistance(items[a], sel) - mapDistance(items[b], sel) || a - b);
  let i = 0;
  return growLayout(items, colW, gap, aspect, () => sorted[i++], sorted.length);
}

/**
 * Masonry grown from the centre: each step finds the free slot nearest the middle, then `next`
 * says which frame goes there.
 */
function growLayout(
  items: DarkroomItem[],
  colW: number,
  gap: number,
  aspect: number,
  next: (x: number, y: number, h: number) => number,
  count: number,
  onPlace?: (k: number, p: Placed) => void
) {
  const pitch = colW + gap;
  const typical = colW / 1.3;
  const cols = new Map<number, { top: number; bottom: number }>();
  const stagger = (c: number) => (((c % 3) + 3) % 3) * colW * 0.18 - colW * 0.18;
  const points = new Map<number, Placed>();
  let minC = 0;
  let maxC = 0;

  for (let n = 0; n < count; n++) {
    let best: { c: number; down: boolean; y: number; d: number } | null = null;
    for (let c = minC - 1; c <= maxC + 1; c++) {
      const col = cols.get(c) ?? { top: stagger(c), bottom: stagger(c) };
      const x = c * pitch;
      for (const down of [true, false]) {
        const y = down ? col.bottom + typical / 2 : col.top - gap - typical / 2;
        // Box distance stretched by the screen's aspect keeps the cluster screen-shaped
        const d = Math.max(Math.abs(x) / aspect, Math.abs(y)) + 0.15 * Math.hypot(x / aspect, y);
        if (!best || d < best.d) best = { c, down, y, d };
      }
    }
    const b = best!;
    const k = next(b.c * pitch, b.y, typical);
    const h = cardHeight(items[k], colW);
    const col = cols.get(b.c) ?? { top: stagger(b.c), bottom: stagger(b.c) };
    const y = b.down ? col.bottom + h / 2 : col.top - gap - h / 2;
    if (b.down) col.bottom += h + gap;
    else col.top -= h + gap;
    cols.set(b.c, col);
    minC = Math.min(minC, b.c);
    maxC = Math.max(maxC, b.c);
    const p = { x: b.c * pitch, y, w: colW, h };
    points.set(k, p);
    onPlace?.(k, p);
  }
  return { points, bounds: boundsOf(points) };
}
