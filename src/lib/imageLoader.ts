import { WIDTHS } from "./imageWidths.mjs";

/**
 * next/image loader for the pre-made sizes in public/img (scripts/images/variants.mjs),
 * so photos never go through Vercel's metered optimizer. Full quality (90+) and
 * anything wider than the largest size get the original file.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/") || !/\.(jpe?g|png|webp)$/i.test(src) || (quality ?? 0) >= 90) return src;
  const w = WIDTHS.find((v) => v >= width);
  if (!w) return src;
  return `/img/${w}${src.replace(/\.\w+$/, ".webp")}`;
}
