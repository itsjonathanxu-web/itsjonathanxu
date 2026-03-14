"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects, categories } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedProjects();

  // Main hero section scroll (entire bg image area)
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax on background image
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "-30%"]);
  // Image fades fully to black BEFORE the section ends — no bleed
  const bgOpacity = useTransform(heroProgress, [0, 0.6, 0.78], [1, 1, 0]);

  // XSEN fades/scales out as you scroll
  const xsenOpacity = useTransform(heroProgress, [0, 0.18], [1, 0]);
  const xsenScale = useTransform(heroProgress, [0, 0.18], [1, 0.97]);

  // Featured projects
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "start 0.3"],
  });
  const featuredTitleOpacity = useTransform(featuredProgress, [0, 1], [0, 1]);
  const featuredTitleY = useTransform(featuredProgress, [0, 1], [60, 0]);

  return (
    <>
      {/* ===== HERO + SCROLLING TEXT WITH PARALLAX BACKGROUND ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "350vh" }}>
        {/* Fixed background image with parallax */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="fixed inset-0 z-0"
        >
          <motion.div style={{ y: bgY }} className="absolute inset-0">
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
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>

        {/* Scrolling content */}
        <div className="relative z-10">
          {/* Screen 1: XSEN — fills the viewport */}
          <div className="grain-overlay flex h-screen items-center justify-center overflow-hidden">
            <motion.div
              style={{ opacity: xsenOpacity, scale: xsenScale }}
              className="flex w-full items-center justify-center px-4"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="font-display text-center text-[clamp(160px,28vw,400px)] font-extrabold leading-[0.8] tracking-[-0.05em] text-white/85"
              >
                XSEN
              </motion.h1>
            </motion.div>
          </div>

          {/* Screen 2: Descriptors + mission — compact */}
          <div className="flex min-h-screen items-center py-20">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-20">
              <ScrollRevealLine>
                <p className="font-display text-[clamp(36px,7vw,90px)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
                  Cinematic Storyteller
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="font-display text-[clamp(36px,7vw,90px)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
                  Videographer
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="font-display text-[clamp(36px,7vw,90px)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
                  Photographer
                </p>
              </ScrollRevealLine>

              <div className="mt-12 md:mt-16">
                <ScrollRevealLine>
                  <p className="max-w-2xl text-[clamp(18px,2.5vw,32px)] font-medium leading-[1.4] text-white/80">
                    Crafting compelling visual narratives for hospitality,
                    architecture, travel, and commercial brands.
                  </p>
                </ScrollRevealLine>
                <ScrollRevealLine>
                  <p className="font-display mt-4 text-[clamp(12px,1.2vw,16px)] font-medium tracking-[0.2em] text-white/40 uppercase">
                    Based in Toronto
                  </p>
                </ScrollRevealLine>
                <ScrollRevealLine>
                  <div className="mt-8 flex gap-5">
                    <Link
                      href="/work"
                      className="glass-btn border border-white/30 px-9 py-3.5 text-[12px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
                    >
                      View Work
                    </Link>
                    <Link
                      href="/contact"
                      className="px-9 py-3.5 text-[12px] font-bold tracking-[0.15em] text-white/50 uppercase transition-colors duration-500 hover:text-white"
                    >
                      Contact
                    </Link>
                  </div>
                </ScrollRevealLine>
              </div>
            </div>
          </div>

          {/* Fade-to-black buffer — image fully fades before this ends */}
          <div className="h-[50vh]" />
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="relative z-10 bg-black py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* Text */}
            <div>
              <ScrollRevealLine>
                <p className="font-display mb-5 text-[12px] font-bold tracking-[0.3em] text-[#8A8A8A] uppercase">
                  About
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <h2 className="font-display text-[clamp(26px,3.5vw,48px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                  I help brands tell their story through cinematic visuals.
                </h2>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="mt-6 text-[15px] leading-[1.8] text-[#8A8A8A] md:text-base">
                  With a background in interior design and architecture, I bring a
                  spatial awareness and compositional eye to every project. Whether
                  it&apos;s a boutique hotel, a travel destination, or a commercial
                  brand — I create content that captures the feeling of being there.
                </p>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <Link
                  href="/about"
                  className="font-display mt-8 inline-block text-[12px] font-bold tracking-[0.15em] text-white uppercase transition-opacity duration-300 hover:opacity-50"
                >
                  More About Me &rarr;
                </Link>
              </ScrollRevealLine>
            </div>

            {/* Image */}
            <ScrollRevealLine>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src="/about/DSC01568.jpg"
                  alt="Jonathan Xu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </ScrollRevealLine>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS — 2 per row ===== */}
      <section ref={featuredRef} className="relative z-10 bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.div
            style={{ opacity: featuredTitleOpacity, y: featuredTitleY }}
            className="mb-14 md:mb-20"
          >
            <h2 className="font-display text-[clamp(44px,7vw,100px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
              FEATURED
              <br />
              PROJECTS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <ScrollRevealLine>
            <div className="mt-14 text-center">
              <Link
                href="/work"
                className="glass-btn inline-block border border-white/30 px-9 py-3.5 text-[12px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
              >
                View All Work
              </Link>
            </div>
          </ScrollRevealLine>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section className="relative z-10 bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine>
            <p className="font-display mb-12 text-[12px] font-bold tracking-[0.3em] text-[#8A8A8A] uppercase">
              Expertise
            </p>
          </ScrollRevealLine>
          <div className="grid gap-0 border-t border-[#1A1A1A] md:grid-cols-2">
            {categories.map((cat, i) => (
              <ScrollRevealLine key={cat.slug}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group flex flex-col gap-3 border-b border-[#1A1A1A] py-8 transition-colors duration-500 md:border-r md:px-8 md:py-10 md:even:border-r-0"
                >
                  <span className="font-display text-[11px] font-bold tracking-[0.2em] text-[#8A8A8A]/50 uppercase transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white transition-all duration-500 group-hover:translate-x-2 md:text-2xl">
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
              className="glass-btn mt-10 inline-block border border-white/30 px-11 py-4 text-[12px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
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
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      <Link
        href={`/work/${project.categorySlug}`}
        className="group block"
      >
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
        <div className="mt-4">
          <p className="font-display text-[11px] font-bold tracking-[0.15em] text-[#8A8A8A] uppercase">
            {project.category}
          </p>
          <h3 className="font-display mt-1.5 text-[clamp(16px,2vw,24px)] font-extrabold tracking-[-0.01em] text-white">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#8A8A8A]">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
