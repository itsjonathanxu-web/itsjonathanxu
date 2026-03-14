"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  const createGrainPattern = useCallback((ctx: CanvasRenderingContext2D) => {
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 128;
    patternCanvas.height = 128;
    const pctx = patternCanvas.getContext("2d")!;
    const imageData = pctx.createImageData(128, 128);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 18; // subtle grain opacity
    }
    pctx.putImageData(imageData, 0, 0);
    return patternCanvas;
  }, []);

  useEffect(() => {
    // Detect touch device
    const onTouch = () => {
      isTouchRef.current = true;
      if (canvasRef.current) canvasRef.current.style.display = "none";
    };
    window.addEventListener("touchstart", onTouch, { once: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let grainPattern: HTMLCanvasElement;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      grainPattern = createGrainPattern(ctx);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Add trail point
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      // Cap trail length
      if (trailRef.current.length > 80) {
        trailRef.current = trailRef.current.slice(-80);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      if (isTouchRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;

      // Age all points
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        if (trail[i].age > 40) {
          trail.splice(i, 1);
        }
      }

      // Draw gradient trail
      for (let i = 0; i < trail.length; i++) {
        const point = trail[i];
        const life = 1 - point.age / 40;
        const radius = 12 + life * 18; // 12-30px radius

        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius
        );
        gradient.addColorStop(0, `rgba(220, 220, 220, ${life * 0.35})`);
        gradient.addColorStop(0.4, `rgba(180, 180, 180, ${life * 0.15})`);
        gradient.addColorStop(1, `rgba(140, 140, 140, 0)`);

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw main cursor circle
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const cursorGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 16);
        cursorGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        cursorGradient.addColorStop(0.5, "rgba(200, 200, 200, 0.2)");
        cursorGradient.addColorStop(1, "rgba(150, 150, 150, 0)");

        ctx.beginPath();
        ctx.arc(mx, my, 16, 0, Math.PI * 2);
        ctx.fillStyle = cursorGradient;
        ctx.fill();
      }

      // Overlay grain on the trail areas
      if (grainPattern && trail.length > 0) {
        ctx.globalCompositeOperation = "overlay";
        const pattern = ctx.createPattern(grainPattern, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          // Only draw grain where trail exists (use destination-atop would be complex, so we do a full pass with low opacity)
          ctx.globalAlpha = 0.7;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
        }
        ctx.globalCompositeOperation = "source-over";
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button").forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, [createGrainPattern]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
