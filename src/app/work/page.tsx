"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { travelLocations } from "@/lib/data";

function FullWidthWorkCard({ location }: { location: (typeof travelLocations)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  const blackOverlay = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!location.coverVideoDesktop) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [location.coverVideoDesktop]);

  const coverSrc = location.slug === "chile" && isMobile
    ? "/work/travel-destination/chile/6.jpg"
    : location.coverImage;

  const videoSrc = isMobile ? location.coverVideoMobile : location.coverVideoDesktop;

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-black" style={{ minHeight: "100vh" }}>
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
        {location.coverVideoDesktop ? (
          <video
            key={videoSrc}
            src={shouldLoadVideo ? videoSrc : undefined}
            poster={location.coverPoster}
            className="h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload={shouldLoadVideo ? "auto" : "none"}
          />
        ) : (
          <Image src={coverSrc} alt={location.title} fill className="object-cover" sizes="100vw" quality={100} unoptimized />
        )}
      </motion.div>

      <motion.div className="absolute inset-0 z-[2] bg-black pointer-events-none" style={{ opacity: blackOverlay }} />

      <div className="absolute inset-x-0 top-0 z-[1] h-[25%]" style={{ background: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[30%]" style={{ background: "linear-gradient(to top, black 0%, transparent 100%)" }} />

      <Link href={`/work/travel-destination/${location.slug}`} className="group absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-20 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px]">
            <h3 className="font-montserrat mt-2 text-[clamp(28px,4vw,56px)] font-extrabold tracking-[-0.02em] text-white transition-transform duration-500 group-hover:translate-x-2">
              {location.title}
            </h3>
            <p className="font-albertian mt-2 max-w-lg text-[14px] leading-[1.7] text-white/50 transition-all duration-500 group-hover:text-white/70">
              {location.description}
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
            className="font-display text-[clamp(60px,18vw,240px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90"
          >
            WORK
          </motion.h1>
        </div>
      </section>

      {/* Full-width work cards */}
      <section className="relative z-10 bg-black">
        {travelLocations.map((location) => (
          <FullWidthWorkCard key={location.slug} location={location} />
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
