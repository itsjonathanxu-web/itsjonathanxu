"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects, categories } from "@/lib/data";

function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative h-[120%] w-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

function StickyReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const featured = getFeaturedProjects();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);

  return (
    <>
      {/* Hero — Full screen with parallax background */}
      <section ref={heroRef} className="relative h-[150vh]">
        <div className="sticky top-0 flex h-screen items-end overflow-hidden">
          {/* Parallax background */}
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
            <Image
              src="/chile/DSC08349.jpg"
              alt="Cinematic travel landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          </motion.div>

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-20 md:pb-28"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4 text-[13px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase"
            >
              Cinematic Visual Storytelling
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-4xl text-[48px] font-extralight leading-[1.05] tracking-[-0.03em] text-white md:text-[96px]"
            >
              XSEN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6 max-w-lg text-base font-light leading-relaxed text-[#F5F5F5]/60 md:text-lg"
            >
              Crafting compelling visual narratives for hospitality, architecture,
              travel, and commercial brands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-10 flex gap-6"
            >
              <Link
                href="/work"
                className="border border-white/60 px-10 py-4 text-[12px] font-medium tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 text-[12px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase transition-colors duration-500 hover:text-white"
              >
                Contact
              </Link>
            </motion.div>

            {/* Scroll line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
            >
              <motion.div
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-12 w-[1px] origin-top bg-white/30"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statement Section — Sticky text with scroll */}
      <section className="relative bg-black py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <StickyReveal>
            <div className="mx-auto max-w-4xl">
              <p className="mb-8 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                The Vision
              </p>
              <h2 className="text-[28px] font-extralight leading-[1.4] tracking-[-0.01em] text-white md:text-[44px] md:leading-[1.3]">
                Every space has a story. I use cinematic videography and photography
                to make that story impossible to ignore — transforming brands into
                visual experiences.
              </h2>
              <Link
                href="/about"
                className="mt-10 inline-block text-[12px] tracking-[0.15em] text-[#8A8A8A] uppercase transition-colors duration-500 hover:text-white"
              >
                More About XSEN &rarr;
              </Link>
            </div>
          </StickyReveal>
        </div>
      </section>

      {/* Featured Work — Immersive scroll gallery */}
      <section className="bg-black">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <StickyReveal className="pb-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-3 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                  Selected Work
                </p>
                <h2 className="text-[36px] font-extralight tracking-[-0.03em] text-white md:text-[56px]">
                  Featured
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden text-[12px] tracking-[0.15em] text-[#8A8A8A] uppercase transition-colors duration-500 hover:text-white md:block"
              >
                View All &rarr;
              </Link>
            </div>
          </StickyReveal>

          {/* Large featured items with parallax */}
          <div className="flex flex-col gap-6">
            {featured.map((project, i) => (
              <StickyReveal key={project.id}>
                <Link
                  href={`/work/${project.categorySlug}`}
                  className="group relative block overflow-hidden"
                >
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    speed={0.15}
                    className="aspect-[21/9] w-full"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-[11px] tracking-[0.2em] text-[#8A8A8A] uppercase">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-light text-white md:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-[#F5F5F5]/60">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </StickyReveal>
            ))}
          </div>

          <StickyReveal className="py-12 text-center md:hidden">
            <Link
              href="/work"
              className="text-[12px] tracking-[0.15em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
            >
              View All Work &rarr;
            </Link>
          </StickyReveal>
        </div>
      </section>

      {/* Services / Categories — Horizontal scroll feel */}
      <section className="bg-black py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <StickyReveal>
            <p className="mb-16 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
              Expertise
            </p>
          </StickyReveal>
          <div className="grid gap-0 border-t border-[#1A1A1A] md:grid-cols-2">
            {categories.map((cat, i) => (
              <StickyReveal key={cat.slug}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group flex flex-col gap-4 border-b border-[#1A1A1A] py-10 transition-colors duration-500 md:border-r md:px-8 md:py-12 md:even:border-r-0"
                >
                  <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8A]/50 uppercase transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-extralight text-white transition-all duration-500 group-hover:translate-x-2 md:text-3xl">
                    {cat.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[#8A8A8A] transition-colors duration-500 group-hover:text-[#C8C8C8]">
                    {cat.description}
                  </p>
                </Link>
              </StickyReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Cinematic closing */}
      <section className="relative overflow-hidden bg-black py-32 md:py-48">
        <StickyReveal>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <p className="mb-6 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
              Start a Project
            </p>
            <h2 className="mx-auto max-w-3xl text-[32px] font-extralight tracking-[-0.03em] text-white md:text-[64px]">
              Let&apos;s create something
              <br />
              unforgettable.
            </h2>
            <Link
              href="/contact"
              className="mt-12 inline-block border border-white/60 px-12 py-5 text-[12px] font-medium tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
            >
              Get in Touch
            </Link>
          </div>
        </StickyReveal>
      </section>
    </>
  );
}
