"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { getTravelLocationBySlug, travelLocations } from "@/lib/data";

const smoothSpring = { stiffness: 60, damping: 20, mass: 0.8 };

// ============================================
// SCROLL REVEAL
// ============================================

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

// ============================================
// GALLERY IMAGE WITH SCROLL REVEAL
// ============================================

function GalleryImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.6"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const scale = useSpring(rawScale, smoothSpring);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useSpring(rawOpacity, smoothSpring);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className="mb-4 break-inside-avoid">
      <div className="group relative overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03), transparent, rgba(100,140,255,0.02))",
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// EDITORIAL GALLERY IMAGE -varied sizes
// ============================================

// Deterministic size pattern for editorial layout
// Pattern repeats: full, half+half, third+third+third, half+half, full, etc.
const LAYOUT_PATTERN = [
  "full",      // 0
  "half",      // 1
  "half",      // 2
  "third",     // 3
  "third",     // 4
  "third",     // 5
  "two-third", // 6
  "third",     // 7
  "full",      // 8
  "half",      // 9
  "half",      // 10
  "third",     // 11
  "two-third", // 12
] as const;

function getImageSize(index: number): string {
  return LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];
}

function EditorialGalleryImage({ src, alt, index, size }: { src: string; alt: string; index: number; size: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.6"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const scale = useSpring(rawScale, smoothSpring);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useSpring(rawOpacity, smoothSpring);

  const colSpan = size === "full" ? "col-span-1 md:col-span-6" : size === "two-third" ? "col-span-1 md:col-span-4" : size === "half" ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2";

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={colSpan}
    >
      <div className="group relative overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          sizes={size === "full" ? "100vw" : size === "two-third" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03), transparent, rgba(100,140,255,0.02))",
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function TravelLocationPage() {
  const params = useParams();
  const slug = params.location as string;
  const location = getTravelLocationBySlug(slug);

  if (!location) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-white">Location not found</h1>
          <Link
            href="/work/travel-destination"
            className="font-display mt-4 inline-block text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white"
          >
            &larr; Back to Travel
          </Link>
        </div>
      </section>
    );
  }

  const otherLocations = travelLocations.filter((l) => l.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ===== HERO -Big Location Title ===== */}
      <section className="relative bg-black pt-32 pb-6 md:pt-44 md:pb-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/work/travel-destination"
              className="font-display mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-white/30 uppercase transition-colors duration-300 hover:text-white/70"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Travel & Destination
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(56px,14vw,200px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90"
          >
            {location.title.toUpperCase()}
          </motion.h1>
        </div>
      </section>

      {/* ===== SCROLL DESCRIPTION ===== */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollReveal>
            <p className="max-w-2xl text-[clamp(18px,2.5vw,28px)] leading-[1.5] font-light text-white/50">
              {location.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== AREAS WITH HEADERS + PHOTO GALLERIES ===== */}
      {location.areas.map((area, areaIndex) => (
        <section key={area.name} className="bg-black pb-20 md:pb-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            {/* Area Header -only show if more than 1 area */}
            {location.areas.length > 1 && (
              <ScrollReveal className="mb-10 md:mb-14">
                <div className="flex items-center gap-6">
                  <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extrabold tracking-[-0.03em] text-white/80">
                    {area.name}
                  </h2>
                  <div className="h-px flex-1 bg-white/8" />
                </div>
              </ScrollReveal>
            )}

            {/* Gallery -editorial grid for Japan, masonry for others */}
            {slug === "japan" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                {area.images.map((img, i) => (
                  <EditorialGalleryImage
                    key={img}
                    src={img}
                    alt={`${location.title} - ${area.name} ${i + 1}`}
                    index={areaIndex === 0 ? i : i + 10}
                    size={getImageSize(i)}
                  />
                ))}
              </div>
            ) : (
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {area.images.map((img, i) => (
                  <GalleryImage
                    key={img}
                    src={img}
                    alt={`${location.title} - ${area.name} ${i + 1}`}
                    index={areaIndex === 0 ? i : i + 10}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ===== OTHER LOCATIONS ===== */}
      {otherLocations.length > 0 && (
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <ScrollReveal>
              <p className="font-display mb-8 text-[11px] font-bold tracking-[0.3em] text-white/25 uppercase">
                More Destinations
              </p>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {otherLocations.map((loc) => (
                <ScrollReveal key={loc.slug}>
                  <Link
                    href={`/work/travel-destination/${loc.slug}`}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-xl"
                  >
                    <Image
                      src={loc.coverImage}
                      alt={loc.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/55" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-display text-[clamp(16px,1.5vw,22px)] font-extrabold tracking-wide text-white">
                        {loc.title}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
