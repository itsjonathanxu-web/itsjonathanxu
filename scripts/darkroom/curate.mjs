// Pick the strongest frames of each project for the Darkroom's opening overview.
//
// Usage (from site/):
//   node scripts/darkroom/curate.mjs     writes src/lib/darkroom-picks.json
//
// Picks live in their own file (frame id -> rank within its project, 1 = best),
// so re-running tag.mjs never wipes them and they can be edited by hand.
// Runs on the Claude subscription via the CLI.

import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const SITE = path.resolve(import.meta.dirname, "../..");
const PUBLIC = path.join(SITE, "public");
const ITEMS = JSON.parse(readFileSync(path.join(SITE, "src/lib/darkroom.json"), "utf8")).items;
const OUT = path.join(SITE, "src/lib/darkroom-picks.json");
const THUMBS = path.join(os.tmpdir(), "darkroom-curate");

// More frames from the bigger bodies of work, never fewer than one per project
const quota = (n) => Math.max(1, Math.min(5, Math.round(n / 4)));

const SCHEMA = {
  type: "object",
  properties: { picks: { type: "array", items: { type: "string" }, description: "file names, strongest first" } },
  required: ["picks"],
};

const PROMPT = (place, files, k) => `You are curating the opening wall of a cinematographer and photographer's portfolio site.
These are all the frames from one project: "${place}".
Read every image file below with the Read tool, then pick the ${k} strongest, strongest first.
Judge like a photo editor: composition, light, mood, a clear subject, and how well it stands for the project.
Among your picks, avoid near-duplicates (same scene, same angle); choose frames that show different sides of the project.
Files marked (video) are stills from a moving clip.
Return exactly ${k} exact file names.

${files.map((f) => `- ${f.name}${f.video ? " (video)" : ""}`).join("\n")}`;

function claude(prompt, cwd) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env };
    delete env.ANTHROPIC_API_KEY;
    delete env.ANTHROPIC_AUTH_TOKEN;
    const argv = ["-p", "--no-session-persistence", "--setting-sources", "", "--tools", "Read", "--allowedTools", "Read", "--add-dir", cwd,
      "--model", "opus", "--output-format", "json", "--json-schema", JSON.stringify(SCHEMA)];
    const p = spawn("claude", argv, { cwd, env, stdio: ["pipe", "pipe", "pipe"] });
    let out = "", err = "";
    const timer = setTimeout(() => p.kill("SIGTERM"), 600_000);
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

const groups = new Map();
for (const item of ITEMS) groups.set(item.place, [...(groups.get(item.place) ?? []), item]);

rmSync(THUMBS, { recursive: true, force: true });
const picks = {};

async function curate([place, items], n) {
  const k = quota(items.length);
  const dir = path.join(THUMBS, "p" + n);
  mkdirSync(dir, { recursive: true });
  const files = items.map((item, i) => {
    const name = `f${String(i + 1).padStart(2, "0")}.jpg`;
    const still = path.join(PUBLIC, item.type === "video" ? item.poster : item.src);
    execFileSync("ffmpeg", ["-v", "error", "-i", still, "-frames:v", "1", "-vf", "scale=640:640:force_original_aspect_ratio=decrease", "-q:v", "4", "-y", path.join(dir, name)]);
    return { name, video: item.type === "video", item };
  });
  if (items.length <= k) {
    files.forEach((f, r) => (picks[f.item.id] = r + 1));
    return;
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await claude(PROMPT(place, files, k), dir);
      const chosen = res.picks.map((p) => files.find((f) => p === f.name || p.endsWith(f.name))).filter(Boolean);
      if (!chosen.length) throw new Error("no valid picks");
      [...new Set(chosen)].slice(0, k).forEach((f, r) => (picks[f.item.id] = r + 1));
      console.log(`  ${place}: ${chosen.length}/${items.length}`);
      return;
    } catch (e) {
      console.log(`  ${place} attempt ${attempt} failed: ${e.message}`);
    }
  }
}

const all = [...groups];
for (let i = 0; i < all.length; i += 3) await Promise.all(all.slice(i, i + 3).map((g, j) => curate(g, i + j)));

writeFileSync(OUT, JSON.stringify(picks, null, 1) + "\n");
console.log(`Wrote ${path.relative(SITE, OUT)} with ${Object.keys(picks).length} picks from ${groups.size} projects`);
