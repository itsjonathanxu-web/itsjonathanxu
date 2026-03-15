"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { categories } from "@/lib/data";

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
      {/* Header */}
      <section className="bg-black pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display mb-4 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
              Portfolio
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="font-display text-[clamp(48px,10vw,120px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
              WORK
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-white/40">
              Cinematic videography and photography across hospitality,
              architecture, travel, and commercial projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="bg-black pb-24 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-5 md:grid-cols-2">
            {categories.map((cat, i) => (
              <ScrollRevealLine key={cat.slug}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden rounded-xl"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                  {/* Default overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/40" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <span className="font-display text-[11px] font-bold tracking-[0.25em] text-white/40 uppercase">
                      0{i + 1}
                    </span>
                    <h2 className="font-display mt-2 text-[clamp(20px,2.5vw,32px)] font-extrabold text-white transition-all duration-500 group-hover:translate-x-1">
                      {cat.title}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/60">
                      {cat.description}
                    </p>
                    <span className="font-display mt-4 text-[11px] font-bold tracking-[0.15em] text-white/30 uppercase transition-colors duration-500 group-hover:text-white/70">
                      View Projects &rarr;
                    </span>
                  </div>
                </Link>
              </ScrollRevealLine>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 overflow-hidden bg-black py-28 md:py-40">
        <ScrollRevealLine>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="font-display mx-auto max-w-3xl text-[clamp(28px,4.5vw,56px)] font-extrabold tracking-[-0.03em] text-white">
              Interested in working together?
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
