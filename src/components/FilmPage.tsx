"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const smoothSpring = { stiffness: 60, damping: 20, mass: 0.8 };

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.55"],
  });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), smoothSpring);
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, 0]), smoothSpring);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Film work page: title, description, full video player with sound, back link */
export default function FilmPage({
  title,
  description,
  video,
  poster,
}: {
  title: string;
  description: string;
  video: string;
  poster: string;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Top spacer for fixed nav */}
      <div className="h-32 md:h-40" />

      {/* Title */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-montserrat text-[clamp(40px,7vw,96px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="font-albertian mt-6 max-w-2xl text-[16px] leading-[1.7] text-white/55">
            {description}
          </p>
        </motion.div>
      </section>

      {/* Video player */}
      <section className="mx-auto mt-12 max-w-[1400px] px-6 md:mt-16 md:px-20">
        <ScrollReveal>
          <div className="overflow-hidden rounded-xl bg-black">
            <video
              src={video}
              poster={poster}
              className="h-auto w-full"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Back link */}
      <section className="mx-auto mt-16 max-w-[1400px] px-6 pb-32 md:px-20">
        <ScrollReveal>
          <Link
            href="/work"
            className="font-montserrat inline-block text-[12px] font-bold tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-white"
          >
            ← Back to Work
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
