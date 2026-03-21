"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { getFeaturedProjects, categories } from "@/lib/data";

/* ===== SPRING CONFIG -Apple-style fluid feel ===== */
const smoothSpring = { stiffness: 60, damping: 20, mass: 0.8 };

export default function Home() {
  const featured = getFeaturedProjects();

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax on background image -spring smoothed
  const bgYRaw = useTransform(heroProgress, [0, 1], [0, -25]);
  const bgYSmooth = useSpring(bgYRaw, smoothSpring);

  // XSEN fades out + scales down + blurs on scroll
  const xsenOpacity = useTransform(heroProgress, [0, 0.12], [1, 0]);
  const xsenScale = useTransform(heroProgress, [0, 0.12], [1, 0.95]);
  const xsenBlur = useTransform(heroProgress, [0, 0.12], [0, 12]);

  // Featured title
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "start 0.4"],
  });
  const featuredTitleOpacity = useTransform(featuredProgress, [0, 1], [0, 1]);
  const featuredTitleY = useTransform(featuredProgress, [0, 1], [80, 0]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "320vh" }}>
        {/* Fixed parallax background */}
        <div className="fixed inset-0 z-0">
          <motion.div
            style={{ y: bgYSmooth }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="absolute -top-[15%] left-0 right-0" style={{ height: "130%" }}>
              <Image
                src="/work/travel-destination/death-valley/itsjonathanxu---dune-2-min.jpg"
                alt="Cinematic background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={90}
              />
            </div>
          </motion.div>
        </div>

        {/* Top gradient for header legibility */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="relative z-10 flex flex-col" style={{ minHeight: "320vh" }}>
          {/* Screen 1: XSEN -fills entire screen */}
          <div className="grain-overlay flex h-screen shrink-0 items-center justify-center overflow-hidden">
            <motion.div
              style={{
                opacity: xsenOpacity,
                scale: xsenScale,
                filter: useTransform(xsenBlur, (v) => `blur(${v}px)`),
              }}
              className="flex w-full items-center justify-center will-change-transform"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display w-full text-center text-[clamp(200px,42vw,600px)] font-extrabold leading-[0.75] tracking-[-0.06em] text-white/90"
              >
                XSEN
              </motion.h1>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent"
              />
            </motion.div>
          </div>

          {/* Screen 2: Videographer statement + categories */}
          <div className="flex min-h-screen shrink-0 items-center py-16">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              {/* Left-aligned intro */}
              <StaggerWords text="A Videographer and" className="font-display text-[clamp(36px,7vw,90px)] font-extrabold leading-[1] tracking-[-0.03em] text-white" />
              <StaggerWords text="Photographer focused on" className="font-display text-[clamp(36px,7vw,90px)] font-extrabold leading-[1] tracking-[-0.03em] text-white" />

              {/* Gap */}
              <div className="h-[clamp(40px,6vw,80px)]" />

              {/* Categories in one line with character-by-character reveal */}
              <div className="flex justify-end">
                <CharacterReveal
                  text="Travel  ·  Architecture and Interiors  ·  Hospitality"
                  className="font-display text-[clamp(16px,3.2vw,42px)] font-bold leading-[1.2] tracking-[-0.01em] text-white/80"
                />
              </div>
            </div>
          </div>

          {/* Gradient fills all remaining space */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 via-[40%] to-black" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="relative z-10 bg-black py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <ScrollRevealLine>
                <p className="font-display mb-4 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
                  About
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <h2 className="font-display text-[clamp(26px,3.5vw,48px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                  I make cinematic visuals for places that deserve to be seen differently. To transcend the norm, not in a way that supersedes the ordinary, but one that brings new perspectives.
                </h2>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="mt-5 text-[16px] leading-[1.8] text-white/60">
                  I come from a design background, years spent in architecture studios studying how space, light, and material shape the way we feel. That lens never left. Now I see the world through craft, culture, and an appreciation for the things that stop you in your tracks. Every frame I capture is rooted in that instinct, the belief that the most powerful visuals come from truly understanding what makes a place extraordinary.
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <Link
                  href="/about"
                  className="font-display mt-7 inline-block text-[12px] font-bold tracking-[0.15em] text-white/70 uppercase transition-opacity duration-300 hover:opacity-50"
                >
                  More About Me &rarr;
                </Link>
              </ScrollRevealLine>
            </div>

            <ParallaxImage
              src="/about/DSC01568.jpg"
              alt="Jonathan Xu"
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS -centered, one per row ===== */}
      <section ref={featuredRef} className="relative z-10 bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.div
            style={{ opacity: featuredTitleOpacity, y: featuredTitleY }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-display text-[clamp(44px,7vw,100px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
              FEATURED
              <br />
              PROJECTS
            </h2>
          </motion.div>

          <div className="flex w-full flex-col gap-8">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <ScrollRevealLine>
            <div className="mt-12 text-center">
              <Link
                href="/work"
                className="glass-btn inline-block px-9 py-3.5 text-[12px] font-bold tracking-[0.15em] text-white uppercase"
              >
                View All Work
              </Link>
            </div>
          </ScrollRevealLine>
        </div>
      </section>

      {/* ===== EXPERTISE -liquid glass panels ===== */}
      <section className="relative z-10 bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine>
            <h2 className="font-display mb-10 text-[clamp(32px,5vw,64px)] font-extrabold tracking-[-0.03em] text-white">
              EXPERTISE
            </h2>
          </ScrollRevealLine>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {categories.map((cat, i) => (
              <ExpertiseCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 overflow-hidden bg-black py-28 md:py-40">
        <ScrollRevealLine>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(32px,5.5vw,72px)] font-extrabold tracking-[-0.03em] text-white">
              Let&apos;s create something
              <br />
              unforgettable.
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

/* ===== COMPONENTS ===== */

/** Scroll-triggered fade + slide up */
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

/** Word-by-word stagger on scroll -each word fades/slides in individually */
function StaggerWords({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}>
      {words.map((word, i) => {
        const start = i / (words.length + 1);
        const end = (i + 1.5) / (words.length + 1);
        return (
          <StaggerWord key={i} word={word} progress={scrollYProgress} start={start} end={end} />
        );
      })}
    </div>
  );
}

function StaggerWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  const blur = useTransform(progress, [start, end], [4, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className="inline-block will-change-transform"
    >
      {word}
    </motion.span>
  );
}

/** Character-by-character reveal with wave animation on scroll */
function CharacterReveal({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.45"],
  });

  const chars = text.split("");

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {chars.map((char, i) => {
        const start = i / (chars.length + 5);
        const end = (i + 8) / (chars.length + 5);
        return (
          <CharRevealUnit key={i} char={char} progress={scrollYProgress} start={start} end={Math.min(end, 1)} />
        );
      })}
    </div>
  );
}

function CharRevealUnit({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  return (
    <motion.span
      style={{
        opacity,
        y: smoothY,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className="inline-block will-change-transform"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/** Parallax image with scroll-driven scale + reveal */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </motion.div>
    </motion.div>
  );
}

/** Project card with staggered entrance + hover reveal */
function ProjectCard({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="w-full will-change-transform"
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={project.categorySlug === "travel-destination" ? `/work/travel-destination/${project.slug}` : `/work/${project.categorySlug}`}
        className="group relative block overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Darken overlay on hover */}
          <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/40" />

          {/* Text revealed on hover */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div className="translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="font-display text-[clamp(18px,2.5vw,28px)] font-extrabold tracking-[-0.01em] text-white">
                {project.title}
              </h3>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/60">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Expertise card with staggered entrance */
function ExpertiseCard({
  cat,
  index,
}: {
  cat: (typeof categories)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.97, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="will-change-transform"
    >
      <Link
        href={`/work/${cat.slug}`}
        className="glass-panel group block p-8 text-left md:p-10"
      >
        <span className="font-display text-[11px] font-bold tracking-[0.25em] text-white/30 uppercase transition-colors duration-500 group-hover:text-white/50">
          0{index + 1}
        </span>
        <h3 className="font-display mt-3 text-[clamp(20px,2.5vw,32px)] font-extrabold text-white transition-all duration-500 group-hover:translate-x-1">
          {cat.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/50 transition-colors duration-500 group-hover:text-white/70">
          {cat.description}
        </p>
      </Link>
    </motion.div>
  );
}
