"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { categories } from "@/lib/data";

/** Full-width immersive category card -fades from black, image, back to black */
function FullWidthCategoryCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-black" style={{ minHeight: "100vh" }}>
      {/* Parallax background image */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Top gradient -fade from black into image */}
      <div className="absolute inset-x-0 top-0 z-[1] h-[60%]" style={{ background: "linear-gradient(to bottom, black 8%, rgba(0,0,0,0.6) 40%, transparent 100%)" }} />

      {/* Bottom gradient -fade from image to black */}
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[60%]" style={{ background: "linear-gradient(to top, black 8%, rgba(0,0,0,0.6) 40%, transparent 100%)" }} />

      {/* Clickable overlay */}
      <Link
        href={`/work/${cat.slug}`}
        className="group absolute inset-0 z-[2]"
      >
        {/* Hover darken */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/30" />

        {/* Text content at bottom */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-20 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
                0{index + 1}
              </p>
            </div>
            <h2 className="font-display mt-2 text-[clamp(28px,4vw,56px)] font-extrabold tracking-[-0.02em] text-white transition-transform duration-500 group-hover:translate-x-2">
              {cat.title}
            </h2>
            <p className="mt-2 max-w-lg text-[14px] leading-[1.7] text-white/50 transition-all duration-500 group-hover:text-white/70">
              {cat.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

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

      {/* Full-width immersive category cards */}
      <section className="relative z-10 bg-black">
        {categories.map((cat, i) => (
          <FullWidthCategoryCard key={cat.slug} cat={cat} index={i} />
        ))}

        <div className="bg-black py-12">
          <ScrollRevealLine>
            <div className="text-center">
              <Link
                href="/contact"
                className="glass-btn inline-block px-11 py-4 text-[12px] font-bold tracking-[0.15em] text-white uppercase"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollRevealLine>
        </div>
      </section>
    </>
  );
}
