"use client";

import { useRef, useEffect, useState } from "react";
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

const VIDEO_DURATION = 6.881875;

export default function Home() {
  const featured = getFeaturedProjects();

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll progress for video scrubbing - prevents stutter on direction changes
  const smoothHeroProgress = useSpring(heroProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });

  // Drive video currentTime from smoothed scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pick mobile or desktop source based on screen width
    const isMobile = window.innerWidth < 768;
    const src = isMobile ? "/hero-video-mobile.mp4" : "/hero-video.mp4";
    if (video.src !== src) {
      video.src = src;
      video.load();
    }

    let rafId: number;
    let lastTime = -1;
    const unsubscribe = smoothHeroProgress.on("change", (v) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vid = videoRef.current;
        if (!vid) return;
        const targetTime = Math.min(v * VIDEO_DURATION, VIDEO_DURATION);
        // Only seek if time changed meaningfully (avoids redundant keyframe decodes)
        if (Math.abs(targetTime - lastTime) > 0.02) {
          vid.currentTime = targetTime;
          lastTime = targetTime;
        }
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [smoothHeroProgress]);

  // Hero title fades out + scales down + blurs on scroll
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
      <section ref={heroSectionRef} className="relative" style={{ height: "280vh" }}>
        {/* Fixed scroll-driven video background */}
        <div className="fixed inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover [object-position:25%_center] md:[object-position:center]"
            muted
            playsInline
            preload="auto"
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Top gradient for header legibility */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="relative z-10 flex flex-col" style={{ minHeight: "280vh" }}>
          {/* Screen 1: Hero title -fills entire screen */}
          <div className="flex h-screen shrink-0 items-center justify-center overflow-hidden">
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
                transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
                className="font-montserrat w-full text-center text-[clamp(34px,12vw,64px)] md:text-[clamp(40px,9vw,140px)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white/90"
              >
                JONATHAN XU
              </motion.h1>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 5, duration: 1 }}
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
              {/* Intro line - mobile */}
              <div className="md:hidden">
                <StaggerWords text="A photographer and" className="font-montserrat text-[clamp(20px,5.5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/70" style={{ fontStyle: "italic" }} />
                <StaggerWords text="videographer who believes" className="font-montserrat text-[clamp(20px,5.5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/70" style={{ fontStyle: "italic" }} />
                <StaggerWords text="every place has" className="font-montserrat text-[clamp(20px,5.5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/70" style={{ fontStyle: "italic" }} />
              </div>
              {/* Intro line - desktop */}
              <div className="hidden md:block">
                <StaggerWords text="A Photographer and Videographer" className="font-montserrat text-[clamp(20px,3.6vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/70" style={{ fontStyle: "italic" }} />
                <StaggerWords text="who believes every place has" className="font-montserrat text-[clamp(20px,3.6vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/70" style={{ fontStyle: "italic" }} />
              </div>

              {/* Gap */}
              <div className="h-[clamp(24px,4vw,56px)]" />

              {/* "something worth feeling" - right aligned, full white, extra letter-spacing to avoid r/t collision */}
              <div className="flex flex-col items-end gap-1 md:gap-2">
                {/* On mobile: 3 separate lines. On desktop: single line */}
                <div className="flex flex-col items-end md:hidden">
                  {["something", "worth", "feeling"].map((word) => (
                    <CharacterReveal
                      key={word}
                      text={word}
                      className="font-montserrat text-[clamp(28px,12vw,102px)] font-extrabold leading-[1] tracking-[-0.02em] text-white"
                    />
                  ))}
                </div>
                <div className="hidden md:block">
                  <CharacterReveal
                    text="something worth feeling."
                    className="font-montserrat text-[clamp(31px,6.5vw,82px)] font-extrabold leading-[1] tracking-[-0.02em] text-white"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Gradient - absolutely positioned from bottom, no flex boundary artifact */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={{ height: "130vh", background: "linear-gradient(to top, black 0%, transparent 100%)" }} />
      </section>

      {/* ===== ABOUT - full-width photo with text overlay ===== */}
      <AboutSectionWithFade />

      {/* ===== FEATURED PROJECTS - full-width immersive ===== */}
      <section ref={featuredRef} className="relative z-10 bg-black" style={{ marginTop: "-1px" }}>
        <div className="mx-auto max-w-[1400px] px-6 pt-52 pb-6 md:px-20 md:pt-80 md:pb-8">
          <motion.div
            style={{ opacity: featuredTitleOpacity, y: featuredTitleY }}
            className="mb-12 md:mb-16"
          >
            <h2
              className="font-montserrat text-center text-[clamp(50px,13vw,120px)] md:text-[clamp(28px,6vw,100px)] font-extrabold leading-[0.9] tracking-[-0.04em]"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,1) 30%, rgba(255,255,255,0.15) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <span className="md:hidden">FEATURED<br />PROJECTS</span>
              <span className="hidden md:inline">FEATURED PROJECTS</span>
            </h2>
          </motion.div>
        </div>

        {/* Full-width project images with black-to-image-to-black per card */}
        {featured.map((project, i) => (
          <FullWidthProjectCard key={project.slug} project={project} index={i} />
        ))}

        <div className="bg-black py-12">
          <ScrollRevealLine>
            <div className="text-center">
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

      {/* ===== CTA ===== */}
      <section className="relative z-10 overflow-hidden bg-black py-28 md:py-40" style={{ marginTop: "-1px" }}>
        <ScrollRevealLine>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="font-montserrat mx-auto max-w-3xl text-[clamp(32px,5.5vw,72px)] font-extrabold tracking-[-0.03em] text-white">
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
function StaggerWords({ text, className, style }: { text: string; className: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", ...style }}>
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

/** About section with scroll fade-from-black on the background image */
function AboutSectionWithFade() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  // Fade image in from black as user scrolls through the section (not on entry)
  const imageOverlay = useTransform(scrollYProgress, [0.15, 0.60], [1, 0]);

  return (
    <section className="relative z-10" style={{ marginTop: "-1px" }}>
      <div ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: "100vh", backgroundColor: "black" }}>
        {/* Parallax background photo */}
        <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
          <Image
            src="/about/DSC01568.jpg"
            alt="Jonathan Xu"
            fill
            className="object-cover"
            sizes="100vw"
            quality={100}
          />
        </motion.div>

        {/* Scroll-driven fade from black over the image */}
        <motion.div className="absolute inset-0 z-[1] bg-black pointer-events-none" style={{ opacity: imageOverlay }} />

        {/* Top fade: blends with hero's bottom gradient — sits above imageOverlay */}
        <div className="absolute inset-x-0 top-0 z-[2] h-[40%] pointer-events-none" style={{ background: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 z-[1] h-[60%]" style={{ background: "linear-gradient(to top, black 8%, rgba(0,0,0,0.6) 40%, transparent 100%)" }} />

        {/* Text content overlaid */}
        <div className="relative z-10 flex min-h-[100vh] flex-col justify-end px-6 pb-16 md:px-20 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px]">
            <ScrollRevealLine>
              <p className="font-montserrat mb-4 text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
                About
              </p>
            </ScrollRevealLine>
            <ScrollRevealLine>
              <h2 className="font-montserrat max-w-4xl text-[clamp(22px,3vw,40px)] font-extrabold leading-[1.2] tracking-[-0.02em] text-white">
                Shooting around the world these last few years has only deepened my passion to capture places the way they deserve to be remembered.
              </h2>
            </ScrollRevealLine>
            <ScrollRevealLine>
              <Link
                href="/about"
                className="glass-btn mt-8 inline-block px-8 py-3 text-[12px] font-bold tracking-[0.15em] text-white uppercase"
              >
                More About My Journey
              </Link>
            </ScrollRevealLine>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Full-width project card with gradient blending between black sections */
function FullWidthProjectCard({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  // Fade from black as card scrolls into view
  const blackOverlay = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const coverSrc = project.slug === "chile" && isMobile
    ? "/work/travel-destination/chile/6.jpg"
    : project.coverImage;

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-black" style={{ minHeight: "100vh" }}>
      {/* Parallax background image */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
        <Image src={coverSrc} alt={project.title} fill className="object-cover" sizes="100vw" quality={100} unoptimized />
      </motion.div>

      {/* Scroll fade-from-black overlay */}
      <motion.div className="absolute inset-0 z-[2] bg-black pointer-events-none" style={{ opacity: blackOverlay }} />

      {/* Top gradient - fade from black into image */}
      <div className="absolute inset-x-0 top-0 z-[1] h-[25%]" style={{ background: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />

      {/* Bottom gradient - fade from image to black */}
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[30%]" style={{ background: "linear-gradient(to top, black 0%, transparent 100%)" }} />

      {/* Clickable overlay */}
      <Link
        href={project.categorySlug === "travel-destination" ? `/work/travel-destination/${project.slug}` : `/work/${project.categorySlug}`}
        className="group absolute inset-0 z-[2]"
      >
        {/* Hover darken */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/30" />

        {/* Text content at bottom */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-20 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-montserrat text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
                {project.categorySlug === "travel-destination" ? "Travel & Destination" : project.categorySlug}
              </p>
            </div>
            <h3 className="font-montserrat mt-2 text-[clamp(28px,4vw,56px)] font-extrabold tracking-[-0.02em] text-white transition-transform duration-500 group-hover:translate-x-2">
              {project.title}
            </h3>
            <p className="font-albertian mt-2 max-w-lg text-[14px] leading-[1.7] text-white/50 transition-all duration-500 group-hover:text-white/70">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

/** Expertise card with staggered entrance + blur */
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
    offset: ["start 0.95", "start 0.5"],
  });
  // Stagger delay per card
  const delay = index * 0.15;
  const opacity = useTransform(scrollYProgress, [delay, delay + 0.6], [0, 1]);
  const rawY = useTransform(scrollYProgress, [delay, delay + 0.6], [60, 0]);
  const y = useSpring(rawY, smoothSpring);
  const rawScale = useTransform(scrollYProgress, [delay, delay + 0.6], [0.92, 1]);
  const scaleVal = useSpring(rawScale, smoothSpring);
  const blur = useTransform(scrollYProgress, [delay, delay + 0.5], [8, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale: scaleVal, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="will-change-transform"
    >
      <Link
        href={`/work/${cat.slug}`}
        className="glass-panel group flex h-full flex-col p-8 text-left md:p-10"
      >
        <span className="font-montserrat text-[11px] font-bold tracking-[0.25em] text-white/30 uppercase transition-colors duration-500 group-hover:text-white/50">
          0{index + 1}
        </span>
        <h3 className="font-montserrat mt-3 text-[clamp(16px,2vw,24px)] font-extrabold text-white transition-all duration-500 group-hover:translate-x-1">
          {cat.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/50 transition-colors duration-500 group-hover:text-white/70">
          {cat.description}
        </p>
      </Link>
    </motion.div>
  );
}
