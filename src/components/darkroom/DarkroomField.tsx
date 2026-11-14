"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLightbox } from "@/components/Lightbox";
import CoverVideo from "@/components/CoverVideo";
import DarkroomControl from "./DarkroomControl";
import { moodDistance, wallLayout, type DarkroomItem, type Light, type Mood } from "@/lib/darkroom";

// Viewport size as an external store, so layout reacts to resize without set-state effects
let viewport = { w: 0, h: 0 };
function subscribeViewport(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
function readViewport() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w !== viewport.w || h !== viewport.h) viewport = { w, h };
  return viewport;
}
const serverViewport = { w: 0, h: 0 };

const EDGE = -120; // negative: panning stops just short of the wall's outer edge, so the screen never shows empty dark
const RELAYOUT_MS = 350; // how often the wall re-sorts while the knob is dragged

export default function DarkroomField({ items }: { items: DarkroomItem[] }) {
  const vp = useSyncExternalStore(subscribeViewport, readViewport, () => serverViewport);
  const [mood, setMood] = useState<Mood>({ warmth: 0, motion: 0 });
  const [layoutMood, setLayoutMood] = useState<Mood>(mood);
  const [light, setLight] = useState<Light | null>(null);
  const [activeVideos, setActiveVideos] = useState<string[]>([]);
  const { open } = useLightbox();

  const mobile = vp.w > 0 && vp.w < 768;
  const colW = mobile ? Math.round(vp.w * 0.62) : Math.round(Math.min(480, Math.max(340, vp.w * 0.29)));
  const gap = mobile ? 8 : 14;
  const radius = mobile ? 14 : 20;

  const { points, bounds } = useMemo(
    () => (vp.w ? wallLayout(items, layoutMood, light, colW, gap, vp.w / vp.h) : { points: [], bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 } }),
    [items, layoutMood, light, colW, gap, vp.w, vp.h]
  );

  const worldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLParagraphElement>(null);
  // Live values the animation loop reads without re-rendering
  const live = useRef({ points, bounds, mood, light });
  const draggedRef = useRef(false);
  const lastRelayout = useRef(0);
  useEffect(() => {
    live.current.points = points;
    live.current.bounds = bounds;
  }, [points, bounds]);

  // The wall is the whole screen: no page scroll while the Darkroom is open
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => void (html.style.overflow = prev);
  }, []);

  const changeMood = (m: Mood) => {
    live.current.mood = m;
    setMood(m);
    const now = performance.now();
    if (now - lastRelayout.current > RELAYOUT_MS) {
      lastRelayout.current = now;
      setLayoutMood(m);
    }
  };
  const settleMood = (m: Mood) => {
    live.current.mood = m;
    setMood(m);
    setLayoutMood(m);
  };
  const changeLight = (l: Light | null) => {
    live.current.light = l;
    setLight(l);
  };

  // One animation loop pans the wall and sets every card's brightness directly, so React never re-renders per frame
  useEffect(() => {
    if (!vp.w) return;
    const maxVideos = mobile ? 2 : 4;
    const lightRadius = Math.max(vp.w, vp.h) * (mobile ? 0.9 : 0.85);
    const pointer = { x: vp.w / 2, y: vp.h / 2 };
    let onPanel = false;
    const off = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let drag: { x: number; y: number; sx: number; sy: number } | null = null;
    const start = performance.now();
    let lastVideoCheck = 0;
    let lastVideos = "";
    let lastCaption = -1;
    let raf = 0;

    // Pan range on one axis: from showing the wall's near edge to its far edge
    const range = (min: number, max: number, view: number) => {
      const a = view / 2 - max - EDGE;
      const b = -(min - EDGE) - view / 2;
      return a < b ? [a, b] : [-(min + max) / 2, -(min + max) / 2];
    };
    const clamp = (v: number, [a, b]: number[]) => Math.min(b, Math.max(a, v));

    // Desktop: the cursor's place on screen is the place on the wall
    const aim = (px: number, py: number) => {
      const { minX, maxX, minY, maxY } = live.current.bounds;
      const rx = range(minX, maxX, vp.w);
      const ry = range(minY, maxY, vp.h);
      target.x = rx[1] + (rx[0] - rx[1]) * px;
      target.y = ry[1] + (ry[0] - ry[1]) * py;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        onPanel = !!panelRef.current?.contains(e.target as Node);
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        // Reaching for the control recentres on the best matches
        if (onPanel) aim(0.5, 0.5);
        else aim(e.clientX / vp.w, e.clientY / vp.h);
      } else if (drag) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        if (Math.hypot(dx, dy) > 8) draggedRef.current = true;
        const { minX, maxX, minY, maxY } = live.current.bounds;
        target.x = clamp(drag.sx + dx, range(minX, maxX, vp.w));
        target.y = clamp(drag.sy + dy, range(minY, maxY, vp.h));
      }
    };
    const onDown = (e: PointerEvent) => {
      draggedRef.current = false;
      if (e.pointerType !== "mouse" && !panelRef.current?.contains(e.target as Node)) {
        drag = { x: e.clientX, y: e.clientY, sx: target.x, sy: target.y };
      }
    };
    const onUp = () => (drag = null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const world = worldRef.current;
      if (!world) return;
      off.x += (target.x - off.x) * 0.06;
      off.y += (target.y - off.y) * 0.06;
      world.style.transform = `translate3d(${off.x.toFixed(1)}px,${off.y.toFixed(1)}px,0)`;

      // The light: the cursor on desktop (screen centre while on the control), the screen centre on touch
      const sx = mobile || onPanel ? vp.w / 2 : pointer.x;
      const sy = mobile || onPanel ? vp.h / 2 : pointer.y;
      const lx = sx - vp.w / 2 - off.x;
      const ly = sy - vp.h / 2 - off.y;
      const elapsed = now - start;
      const { points: pts, mood: m, light: l } = live.current;
      let nearest = -1;
      let nearestD = Infinity;
      const lit: [number, number][] = [];

      for (let i = 0; i < pts.length; i++) {
        const el = cardRefs.current[i];
        if (!el || !pts[i]) continue;
        const d = Math.hypot(pts[i].x - lx, pts[i].y - ly);
        const lightB = Math.max(0, 1 - d / lightRadius) ** 0.8;
        // Frames far from the chosen mood stay in the dark even under the light
        const match = 0.35 + 0.65 * Math.exp(-((moodDistance(items[i], m, l) / 0.85) ** 2));
        // Frames surface from the dark in a ripple outward from the centre
        const reveal = Math.min(1, Math.max(0, (elapsed - 200 - Math.hypot(pts[i].x, pts[i].y) * 0.9) / 1000));
        const b = lightB * match;
        el.style.opacity = ((0.03 + 0.97 * b) * reveal).toFixed(3);
        if (d < nearestD) {
          nearestD = d;
          nearest = i;
        }
        if (items[i].type === "video" && b > 0.4) lit.push([b, i]);
      }

      if (nearest !== lastCaption && captionRef.current) {
        lastCaption = nearest;
        const it = items[nearest];
        captionRef.current.textContent = it ? `${it.place} · ${it.note}` : "";
      }
      if (now - lastVideoCheck > 300) {
        lastVideoCheck = now;
        const ids = lit.sort((a, b) => b[0] - a[0]).slice(0, maxVideos).map(([, i]) => items[i].id).sort();
        const key = ids.join(",");
        if (key !== lastVideos) {
          lastVideos = key;
          setActiveVideos(ids);
        }
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [vp.w, vp.h, mobile, items]);

  return (
    <section className="fixed inset-0 z-40 touch-none overflow-hidden bg-black select-none">
      <div ref={worldRef} className="absolute top-1/2 left-1/2 h-0 w-0 will-change-transform">
        {points.map((p, i) => {
          const item = items[i];
          const playing = item.type === "video" && activeVideos.includes(item.id);
          const still = item.type === "video" ? item.poster : item.src;
          const body = (
            <div className="relative h-full w-full overflow-hidden bg-neutral-950" style={{ borderRadius: radius }}>
              {still && <Image src={still} alt={item.place} fill sizes={`${colW}px`} className="object-cover" draggable={false} />}
              {playing && <CoverVideo src={item.src} poster={item.poster} className="absolute inset-0 h-full w-full object-cover" />}
            </div>
          );
          return (
            <div
              key={item.id}
              className="absolute top-0 left-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ width: p.w, height: p.h, transform: `translate3d(${p.x - p.w / 2}px,${p.y - p.h / 2}px,0)` }}
            >
              <div ref={(el) => void (cardRefs.current[i] = el)} className="h-full w-full" style={{ opacity: 0 }}>
                {item.type === "video" && item.href ? (
                  <Link
                    href={item.href}
                    className="block h-full w-full"
                    aria-label={item.place}
                    draggable={false}
                    onClick={(e) => draggedRef.current && e.preventDefault()}
                  >
                    {body}
                  </Link>
                ) : item.type === "photo" ? (
                  <button
                    type="button"
                    className="block h-full w-full cursor-zoom-in"
                    aria-label={`Open ${item.place}`}
                    onClick={(e) => {
                      if (draggedRef.current) return;
                      const r = e.currentTarget.getBoundingClientRect();
                      open(item.src, item.place, { x: r.left, y: r.top, width: r.width, height: r.height });
                    }}
                  >
                    {body}
                  </button>
                ) : (
                  body
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Soft vignette so the wall melts into the dark at the edges */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Floating control */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-3 px-4 md:bottom-8">
        <p ref={captionRef} className="font-albertian h-5 text-center text-[13px] text-white/60" />
        <div ref={panelRef} className="pointer-events-auto">
          <DarkroomControl mood={mood} light={light} compact={mobile} onMood={changeMood} onMoodEnd={settleMood} onLight={changeLight} />
        </div>
      </div>
    </section>
  );
}
