"use client";

import { useRef } from "react";
import { LIGHTS, LIGHT_LABELS, type Light, type Mood } from "@/lib/darkroom";

const DOTS = 11;
const LABEL = "font-display text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase";
const STOPS: (Light | null)[] = [null, ...LIGHTS];

/**
 * Floating mood pad in the spirit of Apple's Photographic Styles control: drag the knob across
 * cool to warm and still to moving; the slider underneath picks a time of light.
 */
export default function DarkroomControl({
  mood,
  light,
  compact,
  onMood,
  onMoodEnd,
  onLight,
}: {
  mood: Mood;
  light: Light | null;
  compact: boolean;
  onMood: (m: Mood) => void;
  onMoodEnd: (m: Mood) => void;
  onLight: (l: Light | null) => void;
}) {
  const padRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const size = compact ? 112 : 148;

  const moodAt = (e: React.PointerEvent) => {
    const r = padRef.current!.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    return {
      warmth: clamp(((e.clientX - r.left - 10) / (r.width - 20)) * 2 - 1),
      motion: clamp(((e.clientY - r.top - 10) / (r.height - 20)) * 2 - 1),
    };
  };

  const stopAt = (e: React.PointerEvent) => {
    const r = trackRef.current!.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    return STOPS[Math.round(t * (STOPS.length - 1))];
  };

  // Knob in pad pixels, inset so it never clips at the rounded edge
  const inset = 10;
  const kx = inset + ((mood.warmth + 1) / 2) * (size - inset * 2);
  const ky = inset + ((mood.motion + 1) / 2) * (size - inset * 2);
  const stopIndex = STOPS.indexOf(light);

  return (
    <div className="flex flex-col items-center gap-2 rounded-[30px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
      <span className={LABEL}>Still</span>

      <div className="flex items-center gap-2">
      <span className={`${LABEL} [writing-mode:vertical-rl] rotate-180`}>Cool</span>
      <div
        ref={padRef}
        role="slider"
        aria-label="Mood: cool to warm, still to moving"
        aria-valuenow={Math.round(mood.warmth * 100)}
        aria-valuetext={`warmth ${mood.warmth.toFixed(1)}, motion ${mood.motion.toFixed(1)}`}
        tabIndex={0}
        className="relative cursor-pointer touch-none overflow-hidden rounded-[22px]"
        style={{
          width: size,
          height: size,
          // Cool to warm across, still (darker) to moving (lifted) down
          background:
            "linear-gradient(to bottom, rgba(10,10,14,0.55), rgba(10,10,14,0) 55%, rgba(255,255,255,0.06)), linear-gradient(to right, #3b4f7a, #4d6b66 45%, #8a6a4a 75%, #a35f5a)",
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          onMood(moodAt(e));
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) onMood(moodAt(e));
        }}
        onPointerUp={(e) => onMoodEnd(moodAt(e))}
        onKeyDown={(e) => {
          const step = 0.1;
          const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
          if (!d) return;
          e.preventDefault();
          const next = { warmth: Math.max(-1, Math.min(1, mood.warmth + d[0])), motion: Math.max(-1, Math.min(1, mood.motion + d[1])) };
          onMood(next);
          onMoodEnd(next);
        }}
      >
        {/* Dot grid: dots swell and brighten near the knob */}
        {Array.from({ length: DOTS * DOTS }, (_, i) => {
          const cx = ((i % DOTS) + 0.5) * (size / DOTS);
          const cy = (Math.floor(i / DOTS) + 0.5) * (size / DOTS);
          const near = Math.max(0, 1 - Math.hypot(cx - kx, cy - ky) / (size * 0.45));
          const r = 1 + near * 1.6;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: cx - r, top: cy - r, width: r * 2, height: r * 2, opacity: 0.22 + near * 0.6 }}
            />
          );
        })}
        <span
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]"
          style={{ left: kx, top: ky }}
        />
      </div>
      <span className={`${LABEL} [writing-mode:vertical-rl]`}>Warm</span>
      </div>

      <span className={LABEL}>Moving</span>

      {/* Time of light slider */}
      <div className="flex w-full flex-col items-center gap-2">
        <span className="font-display text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase">
          {light ? LIGHT_LABELS[light] : "All light"}
        </span>
        <div
          ref={trackRef}
          role="slider"
          aria-label="Time of light"
          aria-valuenow={stopIndex}
          aria-valuetext={light ? LIGHT_LABELS[light] : "All light"}
          tabIndex={0}
          className="relative h-6 w-full cursor-pointer touch-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            onLight(stopAt(e));
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) onLight(stopAt(e));
          }}
          onKeyDown={(e) => {
            const d = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
            if (!d) return;
            e.preventDefault();
            onLight(STOPS[Math.max(0, Math.min(STOPS.length - 1, stopIndex + d))]);
          }}
        >
          <div className="absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-gradient-to-r from-white/15 via-[#c9a46a]/40 to-[#3b4f7a]/50" />
          <span
            className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-[left] duration-200"
            style={{ left: `${(stopIndex / (STOPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
