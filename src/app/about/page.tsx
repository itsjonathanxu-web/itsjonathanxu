"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

function ScrollRevealLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.65"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
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

  // Parallax on background image
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "-25%"]);

  // Title fade on scroll
  const titleOpacity = useTransform(heroProgress, [0, 0.15], [1, 0]);
  const titleScale = useTransform(heroProgress, [0, 0.15], [1, 0.98]);

  return (
    <>
      {/* ===== HERO SECTION -parallax background like home page ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "280vh" }}>
        {/* Fixed parallax background -stays visible, covered by scrolling gradient */}
        <div className="fixed inset-0 z-0">
          <motion.div style={{ y: bgY }} className="absolute inset-0">
            <div className="absolute -top-[12%] left-0 right-0" style={{ height: "125%" }}>
              <Image
                src="/work/travel-destination/death-valley/dsc07177-enhanced-nr-2-min.jpg"
                alt="Death Valley"
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={100}
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
                  I&apos;m Jonathan Xu. I use a camera to make you feel
                  something. Based in Toronto, I create cinematic visuals for
                  places and brands that deserve to be experienced, not just seen.
                </h2>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="font-display mt-6 text-[clamp(11px,1vw,14px)] font-medium tracking-[0.25em] text-white/35 uppercase">
                  Based in Toronto, Canada
                </p>
              </ScrollRevealLine>
            </div>
          </div>

          {/* Gradient fills all remaining space -no gap possible on any screen */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 via-[40%] to-black" />
          </div>
        </div>
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
                  I studied interior design and architecture, which shaped the
                  way I see everything. Understanding form, light, materiality,
                  and spatial composition taught me how a place can move you
                  before you can explain why. That foundation lives in every
                  frame I capture.
                </p>
              </ScrollRevealLine>

              <ScrollRevealLine>
                <p className="font-display mb-3 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Approach
                </p>
                <p className="text-[16px] leading-[1.8] text-white/60">
                  My work is cinematic, moody, and intentional. Every frame is
                  considered. I shoot both photography and video, often both
                  in a single project, to give clients a complete visual
                  identity that works across their website, social media, and
                  marketing.
                </p>
              </ScrollRevealLine>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FULL-WIDTH STATEMENT ===== */}
      <section className="relative z-10 bg-black py-20 md:py-32" style={{ marginTop: "-1px" }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine>
            <h2 className="font-display mx-auto max-w-4xl text-[clamp(24px,4vw,52px)] font-extrabold leading-[1.2] tracking-[-0.02em] text-white">
              When I&apos;m not behind the camera, I&apos;m planning my next
              destination. Travel isn&apos;t just a subject I shoot, it&apos;s
              how I see the world and find the stories worth telling.
            </h2>
          </ScrollRevealLine>
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
