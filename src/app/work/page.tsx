"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { travelLocations } from "@/lib/data";

const smoothSpring = { stiffness: 60, damping: 20, mass: 0.8 };

function LocationCard({ location }: { location: (typeof travelLocations)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);
  const scale = useSpring(rawScale, smoothSpring);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const opacity = useSpring(rawOpacity, smoothSpring);
  const rawY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const y = useSpring(rawY, smoothSpring);

  return (
    <motion.div ref={ref} style={{ scale, opacity, y }}>
      <Link
        href={`/work/travel-destination/${location.slug}`}
        className="glass-panel group relative block overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {location.slug === "chile" ? (
            <>
              <Image src="/work/travel-destination/chile/6.jpg" alt={location.title} fill className="object-cover md:hidden" sizes="100vw" />
              <Image src={location.coverImage} alt={location.title} fill className="object-cover hidden md:block" sizes="(max-width: 768px) 100vw, 50vw" />
            </>
          ) : (
            <Image
              src={location.coverImage}
              alt={location.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/90 group-hover:via-black/30" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <h3 className="font-display mt-2 text-[clamp(24px,3vw,40px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:translate-x-1">
              {location.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-albertian mt-6 md:mt-8 max-w-xl text-[clamp(15px,1.8vw,20px)] leading-[1.6] font-medium text-white/50"
          >
            The world as I found it.
          </motion.p>
        </div>
      </section>

      {/* Work grid */}
      <section className="relative z-10 bg-black pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {travelLocations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </div>

        <div className="bg-black py-16 md:py-20">
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
