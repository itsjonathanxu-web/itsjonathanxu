// Build the Darkroom: collect every photo and loop, drop duplicates, export new
// media and score each frame with Claude (warmth, motion, light).
//
// Usage (from site/):
//   node scripts/darkroom/tag.mjs            full run, writes src/lib/darkroom.json
//   node scripts/darkroom/tag.mjs --dupes    only report duplicate pairs
//   node scripts/darkroom/tag.mjs --limit 10 score at most 10 new frames
//
// Scores already in darkroom.json are kept (keyed by id), so re-runs only score
// new work and hand edits survive. Runs on the Claude subscription via the CLI.

import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

const SITE = path.resolve(import.meta.dirname, "../..");
const CONTENT = path.resolve(SITE, "../content");
const PUBLIC = path.join(SITE, "public");
const OUT_DIR = path.join(PUBLIC, "darkroom");
const JSON_PATH = path.join(SITE, "src/lib/darkroom.json");
const THUMBS = path.join(os.tmpdir(), "darkroom-thumbs");

const args = process.argv.slice(2);
const ONLY_DUPES = args.includes("--dupes");
const LIMIT = args.includes("--limit") ? +args[args.indexOf("--limit") + 1] : Infinity;

const IMAGE = /\.(jpe?g|png)$/i;
const VIDEO = /\.(mov|mp4)$/i;

// Files on the site that are crops, heroes or backgrounds rather than work
const SKIP_PUBLIC = [/\/symphony-of-movement\/background\.jpg$/, /\/hospitality\/joia-newmarket\//];
const SKIP_CONTENT = [/^Picture of me\//, /^HOSPITALITY\/JOIA\//, /^VIDEO\//, /^A SYMPHONY OF MOVEMENT\/[^/]+\.png$/];

// Loops already made for the site, with the source clip they came from (so the source is skipped)
const SITE_LOOPS = [
  { src: "/featured/symphony-of-movement-card-mobile.mp4", poster: "/featured/symphony-of-movement-card-poster.jpg", title: "A Symphony of Movement", href: "/work/symphony-of-movement" },
  { src: "/featured/through-my-eyes-card-mobile.mp4", poster: "/featured/through-my-eyes-poster.jpg", title: "Through My Eyes", href: "/work/through-my-eyes" },
  { src: "/featured/rakkojae-card-mobile.mp4", poster: "/featured/rakkojae-poster.jpg", title: "Rakkojae, Seoul", href: "/work/rakkojae", from: "RAKKOJAE/Videos/Video 2.mp4" },
  { src: "/hero-video-mobile.mp4", poster: "/darkroom/death-valley-loop-poster.jpg", title: "Death Valley", href: "/work/death-valley", from: "TRAVEL:DESTINATION/DEATH VALLEY/Cover Video.mov" },
];

// ---------- helpers ----------

function walk(dir, base = dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (name.startsWith(".")) return [];
    return statSync(full).isDirectory() ? walk(full, base) : [path.relative(base, full)];
  });
}

function ff(argv) {
  return execFileSync("ffmpeg", ["-v", "error", ...argv], { maxBuffer: 1 << 24 });
}

function probe(file) {
  const out = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", file]).toString();
  const j = JSON.parse(out);
  return { w: j.streams[0].width, h: j.streams[0].height, duration: +j.format?.duration || 0 };
}

// 16x16 difference hash (256 bits) plus average colour; robust to resizing and recompression
function fingerprint(file, isVideo) {
  const seek = isVideo ? ["-ss", "1"] : [];
  const gray = ff([...seek, "-i", file, "-frames:v", "1", "-vf", "scale=17:16:flags=area,format=gray", "-f", "rawvideo", "-"]);
  let bits = "";
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) bits += gray[y * 17 + x] > gray[y * 17 + x + 1] ? "1" : "0";
  const rgb = ff([...seek, "-i", file, "-frames:v", "1", "-vf", "scale=1:1:flags=area,format=rgb24", "-f", "rawvideo", "-"]);
  return { bits, color: [rgb[0], rgb[1], rgb[2]] };
}

// Where a frame sits on the rainbow (0 warm pink/red .. 1 cool violet) and how bright it is (0..1).
// Hue is a saturation-weighted average over a 32x32 thumbnail, so grey pixels don't drag it around.
function measure(file, isVideo, warmth) {
  const px = ff([...(isVideo ? ["-ss", "1"] : []), "-i", file, "-frames:v", "1", "-vf", "scale=32:32:flags=area,format=rgb24", "-f", "rawvideo", "-"]);
  let hx = 0, hy = 0, wsum = 0, lum = 0, sat = 0;
  const n = px.length / 3;
  for (let i = 0; i < px.length; i += 3) {
    const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const s = max ? (max - min) / max : 0;
    lum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (max === min) continue;
    let h = max === r ? (g - b) / (max - min) : max === g ? 2 + (b - r) / (max - min) : 4 + (r - g) / (max - min);
    h = ((h * 60) + 360) % 360;
    const w = s * max;
    hx += Math.cos((h * Math.PI) / 180) * w;
    hy += Math.sin((h * Math.PI) / 180) * w;
    wsum += w;
    sat += s;
  }
  let h = ((Math.atan2(hy, hx) * 180) / Math.PI + 360) % 360;
  if (h >= 300) h -= 360; // pinks sit just past red at the warm end
  const vivid = (h + 60) / 330;
  const saturation = sat / n;
  // Near-grey frames have no reliable hue, so lean on Claude's warmth read instead
  const fallback = 0.27 + (1 - (warmth + 1) / 2) * (0.86 - 0.27);
  const trust = Math.min(1, saturation / 0.18);
  return {
    hue: +(trust * vivid + (1 - trust) * fallback).toFixed(3),
    lum: +(lum / n).toFixed(3),
    sat: +saturation.toFixed(3),
  };
}

const hamming = (a, b) => [...a].reduce((n, c, i) => n + (c !== b[i] ? 1 : 0), 0);
const colorDist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const isDupe = (a, b) => hamming(a.bits, b.bits) <= 26 && colorDist(a.color, b.color) <= 9;

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");

const PLACE_NAMES = { "Symphony Of Movement": "A Symphony of Movement", Rakkojae: "Rakkojae, Seoul" };

// Pretty place name from a folder path, e.g. "travel-destination/japan/tokyo" -> "Tokyo, Japan"
function placeFrom(rel) {
  const parts = rel.split("/").slice(0, -1).map((p) => p.replace(/^(travel-destination|TRAVEL:DESTINATION|architecture-interiors|ARCHITECTURE:INTERIORS|hospitality|HOSPITALITY|work|Photos|Frames)$/i, "")).filter(Boolean);
  const nice = parts.map((p) => p.replace(/[-_]/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()));
  const name = nice.reverse().join(", ") || "Untitled";
  return PLACE_NAMES[name] ?? name;
}

// ---------- 1. collect ----------

const referenced = new Set();
for (const f of walk(path.join(SITE, "src"))) {
  if (!/\.(tsx?|json)$/.test(f) || f.endsWith("darkroom.json")) continue;
  for (const m of readFileSync(path.join(SITE, "src", f), "utf8").matchAll(/["'`](\/work\/[^"'`$]+\.(?:jpe?g|png))["'`]/gi)) referenced.add(m[1]);
}
// Symphony stills are built in a loop in page.tsx, so mark them explicitly
for (let i = 1; i <= 55; i++) referenced.add(`/work/symphony-of-movement/frame-${String(i).padStart(2, "0")}.jpg`);

const candidates = [];
for (const rel of walk(path.join(PUBLIC, "work"))) {
  const url = "/work/" + rel;
  if (!IMAGE.test(rel) || SKIP_PUBLIC.some((r) => r.test(url))) continue;
  candidates.push({ kind: "photo", file: path.join(PUBLIC, "work", rel), url, place: placeFrom(rel), rank: referenced.has(url) ? 0 : 1 });
}
for (const loop of SITE_LOOPS) {
  candidates.push({ kind: "video", file: path.join(PUBLIC, loop.src), url: loop.src, poster: loop.poster, place: loop.title, href: loop.href, rank: 0 });
}
// Where a new loop links to when clicked
const CONTENT_VIDEO_LINKS = { "TRAVEL:DESTINATION/JAPAN/TOKYO/Video 1.mov": "/work/japan" };
const fromLoops = new Set(SITE_LOOPS.map((l) => l.from).filter(Boolean));
for (const rel of walk(CONTENT)) {
  if (SKIP_CONTENT.some((r) => r.test(rel)) || fromLoops.has(rel)) continue;
  const kind = IMAGE.test(rel) ? "photo" : VIDEO.test(rel) ? "video" : null;
  if (kind) candidates.push({ kind, file: path.join(CONTENT, rel), rel, place: placeFrom(rel), rank: 2 });
}
console.log(`Collected ${candidates.length} candidates`);

// ---------- 2. dedupe (site copies win over content copies; referenced wins over unreferenced) ----------

candidates.sort((a, b) => a.rank - b.rank || a.file.localeCompare(b.file));
const kept = [];
const dupes = [];
for (const c of candidates) {
  Object.assign(c, fingerprint(c.file, c.kind === "video"));
  const match = kept.find((k) => k.kind === c.kind && isDupe(k, c));
  if (match) dupes.push([match, c]);
  else kept.push(c);
}
console.log(`Kept ${kept.length}, dropped ${dupes.length} duplicates`);
if (ONLY_DUPES) {
  for (const [a, b] of dupes) console.log(`  ${path.relative(SITE, a.file)}  <=  ${path.relative(SITE, b.file)}  (h${hamming(a.bits, b.bits)} c${colorDist(a.color, b.color).toFixed(0)})`);
  process.exit(0);
}

// ---------- 3. export content-only media into public/darkroom ----------

mkdirSync(OUT_DIR, { recursive: true });
for (const c of kept.filter((k) => k.rank === 2)) {
  const base = slugify(c.rel.replace(/\.[^.]+$/, ""));
  if (c.kind === "photo") {
    const out = path.join(OUT_DIR, base + ".jpg");
    if (!existsSync(out)) execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", "-Z", "2400", c.file, "--out", out], { stdio: "ignore" });
    c.url = "/darkroom/" + base + ".jpg";
    c.file = out;
  } else {
    // Same settings as the site's phone card loops: H.264, slow preset, no audio, faststart
    const out = path.join(OUT_DIR, base + ".mp4");
    const poster = path.join(OUT_DIR, base + "-poster.jpg");
    if (!existsSync(out)) ff(["-i", c.file, "-vf", "scale=1280:-2:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-b:v", "4M", "-maxrate", "6M", "-bufsize", "8M", "-aq-mode", "3", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", "-y", out]);
    if (!existsSync(poster)) ff(["-ss", "0.5", "-i", out, "-frames:v", "1", "-q:v", "3", "-y", poster]);
    c.url = "/darkroom/" + base + ".mp4";
    c.href = CONTENT_VIDEO_LINKS[c.rel];
    c.poster = "/darkroom/" + base + "-poster.jpg";
    c.file = out;
  }
}

// ---------- 4. score with Claude ----------

const previous = existsSync(JSON_PATH) ? JSON.parse(readFileSync(JSON_PATH, "utf8")) : { items: [] };
const scores = new Map(previous.items.map((i) => [i.id, i]));

for (const c of kept) {
  const { w, h } = probe(c.file);
  c.w = w;
  c.h = h;
  c.id = createHash("sha1").update(c.bits).digest("hex").slice(0, 12);
}

const todo = kept.filter((c) => !scores.has(c.id)).slice(0, LIMIT);
console.log(`Scoring ${todo.length} new frames (${kept.filter((c) => scores.has(c.id)).length} already scored)`);

const SCHEMA = {
  type: "object",
  properties: {
    frames: {
      type: "array",
      items: {
        type: "object",
        properties: {
          file: { type: "string" },
          warmth: { type: "number", description: "-1 cold/blue/grey to 1 warm/amber/red, judged by colour temperature and feel" },
          motion: { type: "number", description: "-1 utterly still/calm/empty to 1 kinetic/busy/in motion" },
          light: { type: "string", enum: ["dawn", "day", "golden", "blue", "night"] },
          note: { type: "string", description: "3 to 6 word mood note, no em dashes" },
        },
        required: ["file", "warmth", "motion", "light", "note"],
      },
    },
  },
  required: ["frames"],
};

const PROMPT = (files) => `You are sorting a cinematographer's photos and video stills into a "light field" for a portfolio site.
Read each image file below with the Read tool, then score every one:
- warmth: -1 (cold, blue, grey, steely) to 1 (warm, amber, golden, red). Use the full range across the set.
- motion: -1 (utterly still, calm, empty, quiet) to 1 (kinetic, crowded, energetic, in motion). Use the full range.
- light: the time of light it feels like: dawn, day, golden, blue (blue hour/overcast dusk), or night.
- note: a 3 to 6 word mood note.
Files marked (video) are stills from a moving clip; lean their motion higher.
Return one entry per file, using the exact file name.

${files.map((f) => `- ${f.name}${f.video ? " (video)" : ""}`).join("\n")}`;

function claude(prompt, cwd) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env };
    delete env.ANTHROPIC_API_KEY;
    delete env.ANTHROPIC_AUTH_TOKEN;
    const argv = ["-p", "--no-session-persistence", "--setting-sources", "", "--tools", "Read", "--allowedTools", "Read", "--add-dir", cwd,
      "--model", "sonnet", "--output-format", "json", "--json-schema", JSON.stringify(SCHEMA)];
    const p = spawn("claude", argv, { cwd, env, stdio: ["pipe", "pipe", "pipe"] });
    let out = "", err = "";
    const timer = setTimeout(() => p.kill("SIGTERM"), 360_000);
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (err += d));
    p.on("close", (code) => {
      clearTimeout(timer);
      try {
        const env = JSON.parse(out);
        if (code !== 0 || env.is_error) throw new Error(env.result || err);
        resolve(env.structured_output ?? JSON.parse(env.result.match(/\{[\s\S]*\}/)[0]));
      } catch (e) {
        reject(new Error(`claude failed: ${(e.message || err).slice(0, 300)}`));
      }
    });
    p.stdin.end(prompt);
  });
}

const clamp = (v) => Math.max(-1, Math.min(1, +v || 0));
// Blend Claude's read of warmth with the measured colour so the axis stays honest
const measuredWarmth = ([r, , b]) => clamp((r - b) / 60);

rmSync(THUMBS, { recursive: true, force: true });
mkdirSync(THUMBS, { recursive: true });
const BATCH = 12;
const batches = [];
for (let i = 0; i < todo.length; i += BATCH) batches.push(todo.slice(i, i + BATCH));

async function scoreBatch(batch, n) {
  const dir = path.join(THUMBS, "b" + n);
  mkdirSync(dir, { recursive: true });
  const files = batch.map((c, i) => {
    const name = `f${String(i + 1).padStart(2, "0")}.jpg`;
    ff([...(c.kind === "video" ? ["-ss", "1"] : []), "-i", c.file, "-frames:v", "1", "-vf", "scale=640:640:force_original_aspect_ratio=decrease", "-q:v", "4", "-y", path.join(dir, name)]);
    return { name, video: c.kind === "video", c };
  });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { frames } = await claude(PROMPT(files), dir);
      for (const f of files) {
        const s = frames.find((x) => x.file === f.name || x.file.endsWith(f.name));
        if (!s) throw new Error(`missing score for ${f.name}`);
        scores.set(f.c.id, {
          id: f.c.id,
          warmth: +(0.7 * clamp(s.warmth) + 0.3 * measuredWarmth(f.c.color)).toFixed(3),
          motion: +clamp(s.motion).toFixed(3),
          light: s.light,
          note: s.note.replace(/—/g, ","),
        });
      }
      console.log(`  batch ${n + 1}/${batches.length} done`);
      return;
    } catch (e) {
      console.log(`  batch ${n + 1} attempt ${attempt} failed: ${e.message}`);
    }
  }
}

// Three at a time keeps the subscription happy
for (let i = 0; i < batches.length; i += 3) {
  await Promise.all(batches.slice(i, i + 3).map((b, j) => scoreBatch(b, i + j)));
  writeFileSync(JSON_PATH, JSON.stringify(build(), null, 1) + "\n");
}

// ---------- 5. write (layout happens in the browser, see src/lib/darkroom.ts) ----------

function build() {
  const items = kept.filter((c) => scores.has(c.id)).map((c) => {
    const s = scores.get(c.id);
    return {
      id: c.id,
      type: c.kind,
      src: c.url,
      ...(c.poster ? { poster: c.poster } : {}),
      ...(c.href ? { href: c.href } : {}),
      w: c.w,
      h: c.h,
      place: c.place,
      color: hex(c.color),
      ...measure(c.file, c.kind === "video", s.warmth),
      warmth: s.warmth,
      motion: s.motion,
      light: s.light,
      note: s.note,
    };
  });

  return { generated: new Date().toISOString().slice(0, 10), items };
}

const result = build();
writeFileSync(JSON_PATH, JSON.stringify(result, null, 1) + "\n");
console.log(`Wrote ${path.relative(SITE, JSON_PATH)} with ${result.items.length} items`);
