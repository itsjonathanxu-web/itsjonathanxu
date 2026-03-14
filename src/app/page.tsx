"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects, categories } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedProjects();

  // Hero section scroll tracking (background image area)
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Background image parallax — moves up as you scroll (like mason-wong)
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "-30%"]);
  // Background fades out in last portion
  const bgOpacity = useTransform(heroProgress, [0, 0.65, 0.85], [1, 1, 0]);

  // XSEN title fades out as you scroll past first screen
  const xsenOpacity = useTransform(heroProgress, [0, 0.2], [1, 0]);
  const xsenScale = useTransform(heroProgress, [0, 0.2], [1, 0.95]);

  // Featured projects section
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "start 0.3"],
  });
  const featuredTitleOpacity = useTransform(featuredProgress, [0, 1], [0, 1]);
  const featuredTitleY = useTransform(featuredProgress, [0, 1], [80, 0]);

  return (
    <>
      {/* ===== HERO + SCROLLING TEXT WITH PARALLAX BACKGROUND ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "400vh" }}>
        {/* Fixed background image with parallax Y movement */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="fixed inset-0 z-0"
        >
          <motion.div
            style={{ y: bgY }}
            className="absolute inset-0"
          >
            {/* Oversized container so parallax doesn't reveal edges */}
            <div className="absolute -top-[15%] left-0 right-0" style={{ height: "130%" }}>
              <Image
                src="/chile/DSC08376.jpg"
                alt="Cinematic background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={90}
              />
            </div>
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Scrolling content over fixed background */}
        <div className="relative z-10">
          {/* Screen 1: Big XSEN — fades in on load, fades out on scroll */}
          <div className="flex h-screen items-center justify-center">
            <motion.div
              style={{ opacity: xsenOpacity, scale: xsenScale }}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="text-[clamp(120px,20vw,280px)] font-black leading-[0.85] tracking-[-0.04em] text-white"
              >
                XSEN
              </motion.h1>
            </motion.div>
          </div>

          {/* Screen 2: Descriptor lines */}
          <div className="flex h-screen items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              <ScrollRevealLine>
                <p className="text-[clamp(36px,7vw,90px)] font-black leading-[1.05] tracking-[-0.03em] text-white">
                  Cinematic Storyteller
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="text-[clamp(36px,7vw,90px)] font-black leading-[1.05] tracking-[-0.03em] text-white">
                  Videographer
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="text-[clamp(36px,7vw,90px)] font-black leading-[1.05] tracking-[-0.03em] text-white">
                  Photographer
                </p>
              </ScrollRevealLine>
            </div>
          </div>

          {/* Screen 3: Mission statement + CTA */}
          <div className="flex h-screen items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              <ScrollRevealLine>
                <p className="max-w-3xl text-[clamp(22px,3.5vw,44px)] font-bold leading-[1.35] text-white/90">
                  Crafting compelling visual narratives for hospitality,
                  architecture, travel, and commercial brands.
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="mt-6 text-[clamp(14px,1.5vw,18px)] font-medium tracking-[0.15em] text-white/50 uppercase">
                  Based in Toronto
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <div className="mt-12 flex gap-6">
                  <Link
                    href="/work"
                    className="glass-btn border border-white/30 px-10 py-4 text-[13px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
                  >
                    View Work
                  </Link>
                  <Link
                    href="/contact"
                    className="px-10 py-4 text-[13px] font-bold tracking-[0.15em] text-white/60 uppercase transition-colors duration-500 hover:text-white"
                  >
                    Contact
                  </Link>
                </div>
              </ScrollRevealLine>
            </div>
          </div>

          {/* Screen 4: Fade-to-black transition */}
          <div className="h-screen" />
        </div>
      </section>

      {/* ===== ABOUT SECTION — on black background after fade ===== */}
      <section className="relative z-10 bg-black py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
            {/* Text side */}
            <div>
              <ScrollRevealLine>
                <p className="mb-6 text-[13px] font-bold tracking-[0.3em] text-[#8A8A8A] uppercase">
                  About
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <h2 className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                  I help brands tell their story through cinematic visuals.
                </h2>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="mt-8 text-base leading-[1.8] text-[#8A8A8A] md:text-lg">
                  With a background in interior design and architecture, I bring a
                  spatial awareness and compositional eye to every project. Whether
                  it&apos;s a boutique hotel, a travel destination, or a commercial
                  brand — I create content that captures the feeling of being there.
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <Link
                  href="/about"
                  className="mt-10 inline-block text-[13px] font-bold tracking-[0.15em] text-white uppercase transition-opacity duration-300 hover:opacity-50"
                >
                  More About Me &rarr;
                </Link>
              </ScrollRevealLine>
            </div>

            {/* Glass card with stats */}
            <ScrollRevealLine>
              <div className="glass-card rounded-2xl p-10 md:p-14">
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <p className="text-[clamp(36px,5vw,56px)] font-black text-white">4+</p>
                    <p className="mt-2 text-sm text-[#8A8A8A]">Years of Experience</p>
                  </div>
                  <div>
                    <p className="text-[clamp(36px,5vw,56px)] font-black text-white">50+</p>
                    <p className="mt-2 text-sm text-[#8A8A8A]">Projects Delivered</p>
                  </div>
                  <div>
                    <p className="text-[clamp(36px,5vw,56px)] font-black text-white">4</p>
                    <p className="mt-2 text-sm text-[#8A8A8A]">Specializations</p>
                  </div>
                  <div>
                    <p className="text-[clamp(36px,5vw,56px)] font-black text-white">3</p>
                    <p className="mt-2 text-sm text-[#8A8A8A]">Countries Filmed</p>
                  </div>
                </div>
              </div>
            </ScrollRevealLine>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS — 2 per row ===== */}
      <section ref={featuredRef} className="relative z-10 bg-black py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.div
            style={{ opacity: featuredTitleOpacity, y: featuredTitleY }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-[clamp(48px,8vw,120px)] font-black leading-[0.9] tracking-[-0.04em] text-white">
              FEATURED
              <br />
              PROJECTS
            </h2>
          </motion.div>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <ScrollRevealLine>
            <div className="mt-16 text-center">
              <Link
                href="/work"
                className="glass-btn inline-block border border-white/30 px-10 py-4 text-[13px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
              >
                View All Work
              </Link>
            </div>
          </ScrollRevealLine>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section className="relative z-10 bg-black py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine>
            <p className="mb-16 text-[13px] font-bold tracking-[0.3em] text-[#8A8A8A] uppercase">
              Expertise
            </p>
          </ScrollRevealLine>
          <div className="grid gap-0 border-t border-[#1A1A1A] md:grid-cols-2">
            {categories.map((cat, i) => (
              <ScrollRevealLine key={cat.slug}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group flex flex-col gap-4 border-b border-[#1A1A1A] py-10 transition-colors duration-500 md:border-r md:px-8 md:py-12 md:even:border-r-0"
                >
                  <span className="text-[12px] font-bold tracking-[0.2em] text-[#8A8A8A]/50 uppercase transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white transition-all duration-500 group-hover:translate-x-2 md:text-3xl">
                    {cat.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[#8A8A8A] transition-colors duration-500 group-hover:text-[#C8C8C8]">
                    {cat.description}
                  </p>
                </Link>
              </ScrollRevealLine>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 overflow-hidden bg-black py-32 md:py-48">
        <ScrollRevealLine>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="mx-auto max-w-3xl text-[clamp(36px,6vw,80px)] font-black tracking-[-0.03em] text-white">
              Let&apos;s create something
              <br />
              unforgettable.
            </h2>
            <Link
              href="/contact"
              className="glass-btn mt-12 inline-block border border-white/30 px-12 py-5 text-[13px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
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

function ScrollRevealLine({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.6"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function ProjectCard({
  project,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      <Link
        href={`/work/${project.categorySlug}`}
        className="group block"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-black/5 transition-all duration-700 group-hover:bg-black/25" />
        </div>

        {/* Info below */}
        <div className="mt-5">
          <p className="text-[11px] font-bold tracking-[0.15em] text-[#8A8A8A] uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 text-[clamp(18px,2.5vw,28px)] font-bold tracking-[-0.01em] text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
