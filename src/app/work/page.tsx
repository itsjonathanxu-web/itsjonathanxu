"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { categories } from "@/lib/data";

const smoothSpring = { stiffness: 60, damping: 20, mass: 0.8 };

function CategoryCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.3"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const scale = useSpring(rawScale, smoothSpring);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const opacity = useSpring(rawOpacity, smoothSpring);
  const rawY = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const y = useSpring(rawY, smoothSpring);

  return (
    <motion.div ref={ref} style={{ scale, opacity, y }}>
      <Link
        href={`/work/${cat.slug}`}
        className="group relative block overflow-hidden rounded-2xl"
        style={{ aspectRatio: index === 0 ? "16/9" : "16/10" }}
      >
        {/* Image */}
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 1400px"
        />

        {/* Glass overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/90 group-hover:via-black/40" />

        {/* Refractive glass border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              padding: "1px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02), rgba(100,140,255,0.15), rgba(255,255,255,0.08), rgba(200,160,255,0.1), rgba(255,255,255,0.04))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="font-display text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase transition-colors duration-500 group-hover:text-white/50">
            0{index + 1}
          </span>
          <h2 className="font-display mt-3 text-[clamp(28px,4vw,56px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white transition-transform duration-700 ease-out group-hover:translate-x-2">
            {cat.title}
          </h2>
          <p className="mt-3 max-w-lg text-[14px] leading-[1.7] text-white/35 transition-all duration-500 group-hover:text-white/60">
            {cat.description}
          </p>
          <div className="mt-5 flex items-center gap-2 transition-all duration-500 group-hover:translate-x-1">
            <span className="font-display text-[11px] font-bold tracking-[0.2em] text-white/25 uppercase transition-colors duration-500 group-hover:text-white/70">
              Explore
            </span>
            <svg
              className="h-3.5 w-3.5 text-white/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-32 pb-8 md:pt-44 md:pb-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(80px,18vw,240px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90"
          >
            WORK
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-4 text-[clamp(12px,1.2vw,16px)] font-medium tracking-[0.2em] text-white/30 uppercase"
          >
            Cinematic visual storytelling
          </motion.p>
        </div>
      </section>

      {/* Category Cards — stacked full-width */}
      <section className="bg-black pb-24 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="flex flex-col gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 overflow-hidden bg-black py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1400px] px-6 text-center md:px-20"
        >
          <h2 className="font-display mx-auto max-w-3xl text-[clamp(28px,4.5vw,56px)] font-extrabold tracking-[-0.03em] text-white">
            Interested in working together?
          </h2>
          <Link
            href="/contact"
            className="glass-btn mt-10 inline-block px-11 py-4 text-[12px] font-bold tracking-[0.15em] text-white uppercase"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </>
  );
}
