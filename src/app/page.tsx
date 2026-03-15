"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects, categories } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedProjects();

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax on background image
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "-25%"]);

  // XSEN fades out on scroll
  const xsenOpacity = useTransform(heroProgress, [0, 0.15], [1, 0]);
  const xsenScale = useTransform(heroProgress, [0, 0.15], [1, 0.98]);

  // Featured title
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "start 0.4"],
  });
  const featuredTitleOpacity = useTransform(featuredProgress, [0, 1], [0, 1]);
  const featuredTitleY = useTransform(featuredProgress, [0, 1], [50, 0]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroSectionRef} className="relative" style={{ height: "320vh" }}>
        {/* Fixed parallax background — stays visible, covered by scrolling gradient */}
        <div className="fixed inset-0 z-0">
          <motion.div style={{ y: bgY }} className="absolute inset-0">
            <div className="absolute -top-[12%] left-0 right-0" style={{ height: "125%" }}>
              <Image
                src="/chile/DSC08349.jpg"
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

        <div className="relative z-10 flex flex-col" style={{ minHeight: "320vh" }}>
          {/* Screen 1: XSEN — truly fills the entire screen */}
          <div className="grain-overlay flex h-screen shrink-0 items-center justify-center overflow-hidden">
            <motion.div
              style={{ opacity: xsenOpacity, scale: xsenScale }}
              className="flex w-full items-center justify-center"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                className="font-display w-full text-center text-[clamp(200px,42vw,600px)] font-extrabold leading-[0.75] tracking-[-0.06em] text-white/90"
              >
                XSEN
              </motion.h1>
            </motion.div>
          </div>

          {/* Screen 2: Descriptors + mission */}
          <div className="flex min-h-screen shrink-0 items-center py-16">
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

              <div className="mt-10 md:mt-14">
                <ScrollRevealLine>
                  <p className="max-w-2xl text-[clamp(18px,2.5vw,30px)] font-medium leading-[1.4] text-white/75">
                    Crafting compelling visual narratives for hospitality,
                    architecture, travel, and commercial brands.
                  </p>
                </ScrollRevealLine>
                <ScrollRevealLine>
                  <p className="font-display mt-3 text-[clamp(11px,1vw,14px)] font-medium tracking-[0.25em] text-white/35 uppercase">
                    Based in Toronto
                  </p>
                </ScrollRevealLine>
                <ScrollRevealLine>
                  <div className="mt-8 flex gap-5">
                    <Link
                      href="/work"
                      className="glass-btn px-9 py-3.5 text-[12px] font-bold tracking-[0.15em] text-white uppercase"
                    >
                      View Work
                    </Link>
                    <Link
                      href="/contact"
                      className="px-9 py-3.5 text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors duration-500 hover:text-white"
                    >
                      Contact
                    </Link>
                  </div>
                </ScrollRevealLine>
              </div>
            </div>
          </div>

          {/* Gradient fills all remaining space — no gap possible on any screen */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 via-[40%] to-black" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="relative z-10 bg-black py-20 md:py-32">
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
                  I help brands tell their story through cinematic visuals.
                </h2>
              </ScrollRevealLine>
              <ScrollRevealLine>
                <p className="mt-5 text-[15px] leading-[1.8] text-white/40">
                  With a background in interior design and architecture, I bring a
                  spatial awareness and compositional eye to every project. Whether
                  it&apos;s a boutique hotel, a travel destination, or a commercial
                  brand — I create content that captures the feeling of being there.
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

            <ScrollRevealLine>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
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

      {/* ===== FEATURED PROJECTS — 2 per row, hover reveal ===== */}
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
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

      {/* ===== EXPERTISE — liquid glass panels ===== */}
      <section className="relative z-10 bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine>
            <h2 className="font-display mb-10 text-[clamp(32px,5vw,64px)] font-extrabold tracking-[-0.03em] text-white">
              EXPERTISE
            </h2>
          </ScrollRevealLine>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {categories.map((cat, i) => (
              <ScrollRevealLine key={cat.slug}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="glass-panel group block rounded-2xl p-8 md:p-10"
                >
                  <span className="font-display text-[11px] font-bold tracking-[0.25em] text-white/20 uppercase transition-colors duration-500 group-hover:text-white/40">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-3 text-[clamp(20px,2.5vw,32px)] font-extrabold text-white transition-all duration-500 group-hover:translate-x-1">
                    {cat.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/30 transition-colors duration-500 group-hover:text-white/50">
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
        className="group relative block overflow-hidden rounded-xl"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          {/* Default subtle overlay */}
          <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/50" />

          {/* Text revealed on hover */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                {project.category}
              </p>
              <h3 className="font-display mt-2 text-[clamp(18px,2.5vw,28px)] font-extrabold tracking-[-0.01em] text-white">
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
