"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects, categories } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedProjects();

  // Scroll tracking for the full hero + text section (background image area)
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Background image fades out in the last 20% of the hero section
  const bgOpacity = useTransform(heroProgress, [0, 0.7, 1], [1, 1, 0]);

  // Featured projects section scroll
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "start 0.3"],
  });
  const featuredTitleOpacity = useTransform(featuredProgress, [0, 1], [0, 1]);
  const featuredTitleY = useTransform(featuredProgress, [0, 1], [80, 0]);

  return (
    <>
      {/* ===== HERO + SCROLLING TEXT SECTION WITH FIXED BACKGROUND ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "400vh" }}>
        {/* Fixed background image — vertical crop, stays in place */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="fixed inset-0 z-0"
        >
          <Image
            src="/chile/DSC08376.jpg"
            alt="Cinematic background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Scrolling content on top of fixed background */}
        <div className="relative z-10">
          {/* Screen 1: Big XSEN text */}
          <div className="flex h-screen items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-[clamp(120px,20vw,280px)] font-black leading-[0.85] tracking-[-0.04em] text-white">
                XSEN
              </h1>
            </motion.div>
          </div>

          {/* Screen 2: Descriptor lines — big bold text like mason-wong */}
          <div className="flex h-screen items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              <ScrollRevealLine delay={0}>
                <p className="text-[clamp(32px,6vw,80px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                  Cinematic Storyteller
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine delay={0.1}>
                <p className="text-[clamp(32px,6vw,80px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                  Videographer
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine delay={0.2}>
                <p className="text-[clamp(32px,6vw,80px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                  Photographer
                </p>
              </ScrollRevealLine>
            </div>
          </div>

          {/* Screen 3: Brief about line */}
          <div className="flex h-screen items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              <ScrollRevealLine delay={0}>
                <p className="max-w-3xl text-[clamp(20px,3vw,40px)] font-medium leading-[1.4] text-white/80">
                  Crafting compelling visual narratives for hospitality,
                  architecture, travel, and commercial brands.
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine delay={0.15}>
                <p className="mt-6 text-[clamp(14px,1.5vw,20px)] font-normal tracking-[0.15em] text-white/50 uppercase">
                  Based in Toronto
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine delay={0.3}>
                <div className="mt-12 flex gap-6">
                  <Link
                    href="/work"
                    className="border border-white/60 px-10 py-4 text-[13px] font-semibold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
                  >
                    View Work
                  </Link>
                  <Link
                    href="/contact"
                    className="px-10 py-4 text-[13px] font-semibold tracking-[0.15em] text-white/60 uppercase transition-colors duration-500 hover:text-white"
                  >
                    Contact
                  </Link>
                </div>
              </ScrollRevealLine>
            </div>
          </div>

          {/* Screen 4: Empty — for the fade-to-black transition */}
          <div className="h-screen" />
        </div>
      </section>

      {/* ===== FEATURED PROJECTS — black background ===== */}
      <section ref={featuredRef} className="relative z-10 bg-black py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          {/* Section title */}
          <motion.div
            style={{ opacity: featuredTitleOpacity, y: featuredTitleY }}
            className="mb-24 md:mb-32"
          >
            <h2 className="text-[clamp(48px,8vw,120px)] font-black leading-[0.9] tracking-[-0.04em] text-white">
              FEATURED
              <br />
              PROJECTS
            </h2>
          </motion.div>

          {/* Project cards — large, immersive */}
          <div className="flex flex-col gap-32 md:gap-48">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE / SERVICES ===== */}
      <section className="relative z-10 bg-black py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine delay={0}>
            <p className="mb-16 text-[13px] font-bold tracking-[0.3em] text-[#8A8A8A] uppercase">
              Expertise
            </p>
          </ScrollRevealLine>
          <div className="grid gap-0 border-t border-[#1A1A1A] md:grid-cols-2">
            {categories.map((cat, i) => (
              <ScrollRevealLine key={cat.slug} delay={i * 0.05}>
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
        <ScrollRevealLine delay={0}>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="mx-auto max-w-3xl text-[clamp(36px,6vw,80px)] font-black tracking-[-0.03em] text-white">
              Let&apos;s create something
              <br />
              unforgettable.
            </h2>
            <Link
              href="/contact"
              className="mt-12 inline-block border border-white/60 px-12 py-5 text-[13px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
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
  delay?: number;
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
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      <Link
        href={`/work/${project.categorySlug}`}
        className="group block"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 1400px"
          />
          <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/30" />
        </div>

        {/* Info below image */}
        <div className="mt-6 md:mt-8">
          <div className="flex items-baseline justify-between">
            <h3 className="text-[clamp(24px,4vw,48px)] font-bold tracking-[-0.02em] text-white">
              {project.title}
            </h3>
            <span className="hidden text-[13px] font-medium tracking-[0.1em] text-[#8A8A8A] uppercase md:block">
              {project.category}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#8A8A8A] md:text-lg">
            {project.description}
          </p>
          {project.client && (
            <p className="mt-4 text-[13px] font-medium tracking-[0.1em] text-[#8A8A8A]/60 uppercase">
              {project.client} {project.year && `— ${project.year}`}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
