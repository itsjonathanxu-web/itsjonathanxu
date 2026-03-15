"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    const onTouch = () => {
      isTouchRef.current = true;
      if (canvasRef.current) canvasRef.current.style.display = "none";
    };
    window.addEventListener("touchstart", onTouch, { once: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailRef.current.length > 60) {
        trailRef.current = trailRef.current.slice(-60);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      if (isTouchRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        if (trail[i].age > 30) {
          trail.splice(i, 1);
        }
      }

      for (let i = 0; i < trail.length; i++) {
        const point = trail[i];
        const life = 1 - point.age / 30;
        const radius = 8 + life * 12;

        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${life * 0.15})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const cursorGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 10);
        cursorGradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
        cursorGradient.addColorStop(0.6, "rgba(255, 255, 255, 0.1)");
        cursorGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(mx, my, 10, 0, Math.PI * 2);
        ctx.fillStyle = cursorGradient;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
