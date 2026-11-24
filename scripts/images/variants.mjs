// Pre-make resized copies of every photo in public/, so the site never depends on
// Vercel's image optimizer (the free plan's quota runs out and images break).
//
// Writes public/img/<width>/<path>.webp for each width in WIDTHS. Runs before
// `next dev` and `next build` (see package.json); files already newer than their
// source are skipped. src/lib/imageLoader.ts picks the right one per screen.
//
// Usage (from site/): node scripts/images/variants.mjs

import { mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { WIDTHS } from "../../src/lib/imageWidths.mjs";

const PUBLIC = path.resolve(import.meta.dirname, "../../public");
const OUT = path.join(PUBLIC, "img");
const IMAGE = /\.(jpe?g|png|webp)$/i;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return p === OUT ? [] : walk(p);
    return IMAGE.test(e.name) ? [p] : [];
  });
}

const sources = walk(PUBLIC);
const jobs = [];
for (const file of sources) {
  const rel = path.relative(PUBLIC, file).replace(IMAGE, ".webp");
  const mtime = statSync(file).mtimeMs;
  for (const w of WIDTHS) {
    const out = path.join(OUT, String(w), rel);
    if (existsSync(out) && statSync(out).mtimeMs >= mtime) continue;
    jobs.push({ file, out, w });
  }
}

const started = Date.now();
sharp.concurrency(1);
let next = 0;
async function worker() {
  while (next < jobs.length) {
    const { file, out, w } = jobs[next++];
    mkdirSync(path.dirname(out), { recursive: true });
    // Never upscale: a small source just gets copied at its own size
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  }
}
await Promise.all(Array.from({ length: Math.max(2, os.cpus().length) }, worker));
console.log(`Image variants: ${jobs.length} made, ${sources.length * WIDTHS.length - jobs.length} up to date (${((Date.now() - started) / 1000).toFixed(1)}s)`);
