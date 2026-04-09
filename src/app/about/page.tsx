"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function ScrollRevealLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.65"],
  });
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useSpring(opacityRaw, { stiffness: 100, damping: 30 });
  const y = useSpring(yRaw, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ opacity, y, willChange: "transform, opacity" }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax on background image - spring smooths direction changes
  const bgYRaw = useTransform(heroProgress, [0, 1], ["0%", "-25%"]);
  const bgY = useSpring(bgYRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Title fade on scroll - spring for smooth reversals
  const titleOpacityRaw = useTransform(heroProgress, [0, 0.15], [1, 0]);
  const titleOpacity = useSpring(titleOpacityRaw, { stiffness: 100, damping: 30 });
  const titleScaleRaw = useTransform(heroProgress, [0, 0.15], [1, 0.98]);
  const titleScale = useSpring(titleScaleRaw, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* ===== HERO SECTION -parallax background like home page ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "280vh" }}>
        {/* Fixed parallax background -stays visible, covered by scrolling gradient */}
        <div className="fixed inset-0 z-0" style={{ willChange: "transform", transform: "translateZ(0)" }}>
          <motion.div style={{ y: bgY, willChange: "transform" }} className="absolute inset-0">
            <div className="absolute -top-[12%] left-0 right-0" style={{ height: "125%" }}>
              <Image
                src="/about/hero-about.jpg"
                alt="Death Valley"
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={100}
                unoptimized
              />
            </div>
          </motion.div>
        </div>

        {/* Top gradient for header legibility */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="relative z-10 flex flex-col" style={{ minHeight: "280vh" }}>
          {/* Screen 1: ABOUT title */}
          <div className="flex h-screen shrink-0 items-center justify-center overflow-hidden">
            <motion.div
              style={{ opacity: titleOpacity, scale: titleScale }}
              className="flex w-full items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                className="text-center"
              >
                <h1 className="font-display text-[clamp(80px,20vw,280px)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white/90">
                  ABOUT
                </h1>
                <p className="font-display mt-4 text-[clamp(14px,2vw,22px)] font-medium tracking-[0.2em] text-white/40 uppercase">
                  The story behind the lens
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Screen 2: Bio statement */}
          <div className="flex min-h-screen shrink-0 items-center py-16">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              <ScrollRevealLine>
                <h2 className="font-display max-w-5xl text-[clamp(28px,5vw,64px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                  I&apos;m Jonathan Xu. I craft cinematic visuals for places that deserve to be seen differently.
                </h2>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="font-display mt-6 text-[clamp(11px,1vw,14px)] font-medium tracking-[0.25em] text-white/35 uppercase">
                  Based in Toronto, Canada
                </p>
              </ScrollRevealLine>
            </div>
          </div>

        </div>

        {/* Gradient - absolutely positioned from bottom, same as home page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={{ height: "130vh", background: "linear-gradient(to top, black 0%, transparent 100%)" }} />
      </section>

      {/* ===== BACKGROUND & STORY ===== */}
      <section className="relative z-10 bg-black py-20 md:py-32" style={{ marginTop: "-1px" }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
            {/* Photo */}
            <ScrollRevealLine>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <Image
                  src="/about/portrait.jpg"
                  alt="Jonathan Xu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  quality={100}
                />
              </div>
            </ScrollRevealLine>

            {/* Text blocks */}
            <div className="flex flex-col gap-16 md:pt-12">
              <ScrollRevealLine>
                <p className="font-display mb-3 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Background
                </p>
                <p className="text-[16px] leading-[1.8] text-white/60">
                  I studied interior design. It taught me to see before I shoot: how spatial composition works, how light and shadow interact, how a place communicates something before anyone says a word. That foundation is in every frame.
                </p>
              </ScrollRevealLine>

              <ScrollRevealLine>
                <p className="font-display mb-3 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Approach
                </p>
                <p className="text-[16px] leading-[1.8] text-white/60">
                  My work is intentional and tells a story. I shoot with the belief that beauty is all around us. It does not announce itself. It waits in the quality of light at a certain hour, or in the expression of people walking past. I seek these moments and capture them with purpose. Not to supersede the ordinary, but to bring a new perspective to it.
                </p>
              </ScrollRevealLine>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 overflow-hidden bg-black py-28 md:py-40" style={{ marginTop: "-1px" }}>
        <ScrollRevealLine>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(32px,5.5vw,72px)] font-extrabold tracking-[-0.03em] text-white">
              Let&apos;s create something together.
            </h2>
            <Link
              href="/contact"
              className="glass-btn mt-10 inline-block px-11 py-4 text-[12px] font-bold tracking-[0.15em] text-white uppercase"
            >
              Get in Touch
            </Link>
          </div>
        </ScrollRevealLine>
      </section>
    </>
  );
}
