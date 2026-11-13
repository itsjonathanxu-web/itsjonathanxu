"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLightbox } from "@/components/Lightbox";
import CoverVideo from "@/components/CoverVideo";
import { layout, type DarkroomItem, type Mode } from "@/lib/darkroom";

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

const LIGHT_LABELS: Record<string, string> = { dawn: "Dawn", day: "Day", golden: "Golden", blue: "Blue hour", night: "Night" };

export default function DarkroomField({ items }: { items: DarkroomItem[] }) {
  const vp = useSyncExternalStore(subscribeViewport, readViewport, () => serverViewport);
  const [mode, setMode] = useState<Mode>("field");
  const [activeVideos, setActiveVideos] = useState<string[]>([]);
  const { open } = useLightbox();

  const mobile = vp.w > 0 && vp.w < 768;
  const base = mobile ? 92 : 150;
  const gap = mobile ? 14 : 26;
  const width = mobile ? Math.round(vp.w * 2.4) : Math.round(Math.max(vp.w * 1.9, 1600));
  const height = Math.max(vp.h * 1.6, Math.round((items.length * (base + gap) ** 2 * 1.5) / width));

  const { points, bands } = useMemo(
    () => (vp.w ? layout(items, mode, width, height, base, gap) : { points: [], bands: [] }),
    [items, mode, width, height, base, gap, vp.w]
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const pointsRef = useRef(points);
  // Set while a touch drag pans the field, so lifting the finger doesn't open a photo
  const draggedRef = useRef(false);
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  // One animation loop moves the light and sets every card's brightness directly, so React never re-renders per frame
  useEffect(() => {
    if (!vp.w) return;
    const maxVideos = mobile ? 2 : 4;
    const radius = Math.max(vp.w, vp.h) * (mobile ? 0.6 : 0.5);
    const pointer = { x: vp.w / 2, y: vp.h / 2 };
    let offset = -(width - vp.w) / 2;
    let target = offset;
    let drag: { x: number; start: number } | null = null;
    const start = performance.now();
    let lastVideoCheck = 0;
    let lastVideos = "";
    let lastCaption = -1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        target = -(width - vp.w) * (e.clientX / vp.w);
      } else if (drag) {
        if (Math.abs(e.clientX - drag.x) > 8) draggedRef.current = true;
        target = Math.min(0, Math.max(vp.w - width, drag.start + (e.clientX - drag.x)));
      }
    };
    const onDown = (e: PointerEvent) => {
      draggedRef.current = false;
      if (e.pointerType !== "mouse") drag = { x: e.clientX, start: target };
    };
    const onUp = () => (drag = null);
    const field = fieldRef.current;
    window.addEventListener("pointermove", onMove, { passive: true });
    field?.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const section = sectionRef.current;
      if (!section || !field) return;
      const rect = section.getBoundingClientRect();
      // Skip all work while the field is off screen
      if (rect.bottom < 0 || rect.top > vp.h) return;

      offset += (target - offset) * 0.08;
      field.style.transform = `translate3d(${offset.toFixed(1)}px,0,0)`;

      // The light: the cursor on desktop, the middle of the screen on touch
      const lx = (mobile ? vp.w / 2 : pointer.x) - offset;
      const ly = (mobile ? vp.h / 2 : pointer.y) - rect.top;
      const elapsed = now - start;
      const pts = pointsRef.current;
      let nearest = -1;
      let nearestD = Infinity;
      const lit: [number, number][] = [];

      for (let i = 0; i < pts.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = Math.hypot(pts[i].x - lx, pts[i].y - ly);
        const b = Math.max(0, 1 - d / radius);
        // Frames surface from the dark in a ripple outward from the light
        const reveal = Math.min(1, Math.max(0, (elapsed - 300 - d * 1.1) / 900));
        el.style.opacity = ((0.04 + 0.96 * b ** 1.15) * reveal).toFixed(3);
        el.style.scale = (0.94 + 0.06 * b).toFixed(3);
        if (d < nearestD) {
          nearestD = d;
          nearest = i;
        }
        if (items[i].type === "video" && b > 0.35) lit.push([b, i]);
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
      field?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [vp.w, vp.h, mobile, width, items]);

  return (
    <section ref={sectionRef} className="relative overflow-clip bg-black" style={{ height: height || "100vh" }}>
      {/* Fixed overlay while the field is on screen: axes, caption, mode switch */}
      <div className="pointer-events-none sticky top-0 z-20 -mb-[100svh] h-[100svh]">
        {mode === "field" && (
          <>
            <span className="font-display absolute top-1/2 left-4 -translate-y-1/2 text-[10px] font-bold tracking-[0.35em] text-white/25 uppercase md:left-8">Cool</span>
            <span className="font-display absolute top-1/2 right-4 -translate-y-1/2 text-[10px] font-bold tracking-[0.35em] text-white/25 uppercase md:right-8">Warm</span>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 px-6 md:bottom-10">
          <p ref={captionRef} className="font-albertian h-5 text-center text-[13px] text-white/55" />
          <div className="pointer-events-auto flex gap-2">
            {(["field", "light"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`glass-btn px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-opacity ${mode === m ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
              >
                {m === "field" ? "Light field" : "Time of light"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === "field" ? (
        <>
          <span className="font-display absolute top-6 left-1/2 z-10 -translate-x-1/2 text-[10px] font-bold tracking-[0.35em] text-white/25 uppercase">Still</span>
          <span className="font-display absolute bottom-32 left-1/2 z-10 -translate-x-1/2 text-[10px] font-bold tracking-[0.35em] text-white/25 uppercase">Moving</span>
        </>
      ) : (
        bands.map((b) => (
          <span
            key={b.light}
            className="font-display absolute left-4 z-10 text-[10px] font-bold tracking-[0.35em] text-white/30 uppercase md:left-8"
            style={{ top: b.top + 8 }}
          >
            {LIGHT_LABELS[b.light]}
          </span>
        ))
      )}

      <div ref={fieldRef} className="absolute top-0 left-0 touch-pan-y" style={{ width, height }}>
        {points.map((p, i) => {
          const item = items[i];
          const live = item.type === "video" && activeVideos.includes(item.id);
          const still = item.type === "video" ? item.poster : item.src;
          const body = (
            <div className="relative h-full w-full overflow-hidden bg-neutral-950">
              {still && (
                <Image src={still} alt={item.place} fill sizes={`${Math.max(p.w, p.h)}px`} className="object-cover" />
              )}
              {live && <CoverVideo src={item.src} poster={item.poster} className="absolute inset-0 h-full w-full object-cover" />}
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
                  <Link href={item.href} className="block h-full w-full" aria-label={item.place}>
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
    </section>
  );
}
