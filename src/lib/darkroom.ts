import data from "./darkroom.json";

export type Light = "dawn" | "day" | "golden" | "blue" | "night";
export type Mode = "field" | "light";

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

export const darkroomItems = data.items as DarkroomItem[];

export interface Placed {
  x: number; // card centre, px within the field
  y: number;
  w: number;
  h: number;
}

/** Card size with the same area for every frame, so portraits and landscapes weigh the same. */
export function cardSize(item: DarkroomItem, base: number) {
  const aspect = Math.min(2, Math.max(0.5, item.w / item.h));
  return { w: Math.round(base * Math.sqrt(aspect)), h: Math.round(base / Math.sqrt(aspect)) };
}

// Mix raw value with rank so the field fills evenly but keeps its order
function spread(values: number[]) {
  const order = values.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const rank = new Array(values.length);
  order.forEach(([, i], r) => (rank[i] = values.length > 1 ? r / (values.length - 1) : 0.5));
  return values.map((v, i) => 0.5 * ((v + 1) / 2) + 0.5 * rank[i]);
}

/** Push overlapping cards apart, keeping each inside its allowed box. */
function relax(points: Placed[], bounds: { top: number; bottom: number }[], width: number, gap: number) {
  for (let it = 0; it < 90; it++) {
    let moved = false;
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const ox = (a.w + b.w) / 2 + gap - Math.abs(b.x - a.x);
        const oy = (a.h + b.h) / 2 + gap - Math.abs(b.y - a.y);
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        // Separate along the axis that needs the smaller push
        if (ox < oy) {
          const s = (b.x >= a.x ? 1 : -1) * ox / 2;
          a.x -= s;
          b.x += s;
        } else {
          const s = (b.y >= a.y ? 1 : -1) * oy / 2;
          a.y -= s;
          b.y += s;
        }
      }
    }
    points.forEach((p, i) => {
      p.x = Math.min(width - p.w / 2, Math.max(p.w / 2, p.x));
      p.y = Math.min(bounds[i].bottom - p.h / 2, Math.max(bounds[i].top + p.h / 2, p.y));
    });
    if (!moved) break;
  }
}

/** Lay out every card for a mode. Field: cool left to warm right, still top to moving bottom. Light: one band per time of light. */
export function layout(items: DarkroomItem[], mode: Mode, width: number, height: number, base: number, gap: number) {
  const sizes = items.map((i) => cardSize(i, base));
  const xs = spread(items.map((i) => i.warmth));
  const pad = base * 0.8;
  const innerW = width - pad * 2;

  if (mode === "field") {
    const ys = spread(items.map((i) => i.motion));
    const points = items.map((_, k) => ({ x: pad + xs[k] * innerW, y: pad + ys[k] * (height - pad * 2), ...sizes[k] }));
    const bounds = items.map(() => ({ top: 0, bottom: height }));
    relax(points, bounds, width, gap);
    return { points, bands: [] as { light: Light; top: number; bottom: number }[] };
  }

  // Band heights follow how many frames share that light
  const counts = LIGHTS.map((l) => items.filter((i) => i.light === l).length);
  const used = LIGHTS.filter((_, k) => counts[k] > 0);
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  let top = 0;
  const bands = used.map((light) => {
    const h = Math.max(base * 2, (counts[LIGHTS.indexOf(light)] / total) * height);
    const band = { light, top, bottom: top + h };
    top += h;
    return band;
  });
  const scale = height / top;
  bands.forEach((b) => ((b.top *= scale), (b.bottom *= scale)));

  const bounds = items.map((i) => bands.find((b) => b.light === i.light)!);
  const points = items.map((_, k) => ({
    x: pad + xs[k] * innerW,
    y: (bounds[k].top + bounds[k].bottom) / 2,
    ...sizes[k],
  }));
  relax(points, bounds, width, gap);
  return { points, bands };
}
