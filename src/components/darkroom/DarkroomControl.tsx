"use client";

import { useEffect, useRef, useState } from "react";
import type { MapPoint } from "@/lib/darkroom";

const DOTS = 11;
const INSET = 10; // knob travel stops short of the pad's rounded edge
const CLOSE_DELAY = 1000;
const LABEL = "font-display text-[9px] font-bold tracking-[0.3em] text-white/45 uppercase";

/**
 * Colour map pop-up in the spirit of Apple's Photographic Styles pad: warm to cool across like a
 * rainbow, light to dark down. Closed by default behind a small arrow bar; hover (or tap) opens it.
 */
export default function DarkroomControl({
  sel,
  compact,
  onSelect,
  onSelectEnd,
  onClear,
}: {
  sel: MapPoint | null;
  compact: boolean;
  onSelect: (p: MapPoint) => void;
  onSelectEnd: (p: MapPoint) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipe = useRef<number | null>(null);
  const size = compact ? 132 : 156;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };
  useEffect(() => cancelClose, []);

  // On touch, a tap anywhere outside closes it
  useEffect(() => {
    if (!open || !compact) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open, compact]);

  const pointAt = (e: React.PointerEvent) => {
    const r = padRef.current!.getBoundingClientRect();
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    return {
      x: clamp((e.clientX - r.left - INSET) / (r.width - INSET * 2)),
      y: clamp((e.clientY - r.top - INSET) / (r.height - INSET * 2)),
    };
  };

  const kx = sel ? INSET + sel.x * (size - INSET * 2) : -100;
  const ky = sel ? INSET + sel.y * (size - INSET * 2) : -100;

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-col items-center"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
    >
      {/* Panel, floating above the arrow bar */}
      <div
        className={`absolute bottom-full mb-3 flex flex-col items-center gap-2 rounded-[30px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <span className={LABEL}>Light</span>
        <div className="flex items-center gap-2">
          <span className={`${LABEL} rotate-180 [writing-mode:vertical-rl]`}>Warm</span>
          <div
            ref={padRef}
            role="slider"
            aria-label="Colour: warm to cool, light to dark"
            aria-valuenow={sel ? Math.round(sel.x * 100) : 50}
            aria-valuetext={sel ? `colour ${Math.round(sel.x * 100)}% toward cool, ${Math.round(sel.y * 100)}% toward dark` : "everything"}
            tabIndex={open ? 0 : -1}
            className="relative cursor-pointer touch-none overflow-hidden rounded-[22px]"
            style={{
              width: size,
              height: size,
              // Rainbow from warm to cool (muted to match the site), lifted at the top and sinking to black at the bottom
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.36), rgba(255,255,255,0) 42%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.82)), linear-gradient(rgba(38,38,42,0.35), rgba(38,38,42,0.35)), linear-gradient(to right, #b5536b 0%, #b8473f 18%, #c07434 27%, #c4a443 36%, #5f9a4f 55%, #3d9a9b 73%, #3b5fb0 86%, #6a47ad 100%)",
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              onSelect(pointAt(e));
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) onSelect(pointAt(e));
            }}
            onPointerUp={(e) => onSelectEnd(pointAt(e))}
            onKeyDown={(e) => {
              const d = { ArrowLeft: [-0.05, 0], ArrowRight: [0.05, 0], ArrowUp: [0, -0.05], ArrowDown: [0, 0.05] }[e.key];
              if (!d) return;
              e.preventDefault();
              const from = sel ?? { x: 0.5, y: 0.5 };
              const next = { x: Math.max(0, Math.min(1, from.x + d[0])), y: Math.max(0, Math.min(1, from.y + d[1])) };
              onSelect(next);
              onSelectEnd(next);
            }}
          >
            {/* Dot grid: dots swell and brighten near the knob */}
            {Array.from({ length: DOTS * DOTS }, (_, i) => {
              const cx = ((i % DOTS) + 0.5) * (size / DOTS);
              const cy = (Math.floor(i / DOTS) + 0.5) * (size / DOTS);
              const near = sel ? Math.max(0, 1 - Math.hypot(cx - kx, cy - ky) / (size * 0.4)) : 0;
              const r = 1 + near * 1.6;
              return (
                <span
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{ left: cx - r, top: cy - r, width: r * 2, height: r * 2, opacity: 0.25 + near * 0.6 }}
                />
              );
            })}
            {sel && (
              <span
                className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]"
                style={{ left: kx, top: ky }}
              />
            )}
          </div>
          <span className={`${LABEL} [writing-mode:vertical-rl]`}>Cool</span>
        </div>
        <span className={LABEL}>Dark</span>
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={onClear}
          className={`font-display mt-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-opacity ${sel ? "text-white/80 hover:text-white" : "pointer-events-none text-white/30"}`}
        >
          {sel ? "Show all" : compact ? "Tap a colour" : "Pick a colour"}
        </button>
      </div>

      {/* Arrow bar: always there, opens the panel */}
      <button
        type="button"
        aria-label={open ? "Close colour map" : "Open colour map"}
        aria-expanded={open}
        className="flex h-7 w-16 touch-none items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl transition-colors hover:bg-white/20"
        onClick={() => setOpen((o) => !o)}
        onPointerDown={(e) => (swipe.current = e.clientY)}
        onPointerUp={(e) => {
          // Swipe up opens, swipe down closes; a tap is handled by onClick
          if (swipe.current === null) return;
          const dy = e.clientY - swipe.current;
          swipe.current = null;
          if (Math.abs(dy) > 12) {
            e.preventDefault();
            setOpen(dy < 0);
          }
        }}
      >
        <svg width="14" height="8" viewBox="0 0 14 8" className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} aria-hidden>
          <path d="M1 7l6-6 6 6" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
