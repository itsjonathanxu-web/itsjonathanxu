"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLightbox } from "@/components/Lightbox";

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

// Film still that scales in on scroll and opens in the lightbox on click
function FrameImg({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.6"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.94, 1]), smoothSpring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), smoothSpring);
  const { open } = useLightbox();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    open(src, alt, { x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  };

  return (
    <motion.div ref={ref} style={{ scale, opacity }}>
      <div className="cursor-zoom-in overflow-hidden rounded-xl" onClick={handleClick}>
        <Image src={src} alt={alt} width={1200} height={900} className="h-auto w-full" sizes={sizes} />
      </div>
    </motion.div>
  );
}

/** Film work page: title, description, full video player with sound, optional stills, back link */
export default function FilmPage({
  title,
  description,
  video,
  poster,
  frames = [],
  background,
}: {
  title: string;
  description: string;
  video: string;
  poster: string;
  /** Stills shown under the video; the first one runs full width */
  frames?: string[];
  /** Hero image behind the title, fading to black into the video (like Chile) */
  background?: string;
}) {
  const [leadFrame, ...gridFrames] = frames;
  return (
    <div className="min-h-screen bg-black">
      {/* Title, over the optional hero background */}
      <section className="relative" style={background ? { marginBottom: "-30vh" } : undefined}>
        {background && (
          <>
            <div className="absolute inset-0">
              <Image src={background} alt={`${title} background`} fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
            <div className="absolute inset-x-0 bottom-0" style={{ height: "60%", background: "linear-gradient(to bottom, transparent 0%, black 100%)" }} />
          </>
        )}
        <motion.div
          className={`relative z-10 mx-auto max-w-[1400px] px-6 md:px-20 ${background ? "pt-[30vh] pb-[40vh]" : "pt-32 md:pt-40"}`}
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
      <section className="relative z-10 mx-auto mt-12 max-w-[1400px] px-6 md:mt-16 md:px-20">
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

      {/* Stills */}
      {leadFrame && (
        <section className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-4 px-6 md:mt-24 md:px-20">
          <FrameImg src={leadFrame} alt={`${title} still 1`} sizes="(max-width: 1400px) 100vw, 1400px" />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {gridFrames.map((src, i) => (
              <FrameImg key={src} src={src} alt={`${title} still ${i + 2}`} sizes="(max-width: 768px) 50vw, 33vw" />
            ))}
          </div>
        </section>
      )}

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
