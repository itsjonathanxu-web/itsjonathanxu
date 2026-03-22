"use client";

import { useRef, useState } from "react";
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
// JAPAN GALLERY - Custom layouts per area
// ============================================

// Simple scroll-reveal image (no orientation detection needed)
function JapanImg({ src, alt, index, className, onHorizontalDetected }: { src: string; alt: string; index: number; className?: string; onHorizontalDetected?: (isH: boolean) => void }) {
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
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      <div className="group relative h-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={index < 3 ? "eager" : "lazy"}
          onLoad={onHorizontalDetected ? (e) => {
            const img = e.currentTarget;
            onHorizontalDetected(img.naturalWidth > img.naturalHeight);
          } : undefined}
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

// Wrapper that detects horizontal and spans full width
function JapanGridImg({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [isHorizontal, setIsHorizontal] = useState(false);
  return (
    <JapanImg
      src={src}
      alt={alt}
      index={index}
      className={isHorizontal ? "col-span-1 md:col-span-3" : "col-span-1"}
      onHorizontalDetected={setIsHorizontal}
    />
  );
}

// Render images in explicit rows with specified column counts
function RowGallery({ images, rows, locationTitle, areaName }: { images: string[]; rows: { imgs: number[]; cols: number }[]; locationTitle: string; areaName: string }) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, rowIdx) => {
        const gridCols = row.cols === 1 ? "md:grid-cols-1" : row.cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
        return (
          <div key={rowIdx} className={`grid grid-cols-1 gap-4 ${gridCols}`}>
            {row.imgs.map((imgIdx) => {
              const img = images[imgIdx];
              if (!img) return null;
              return (
                <JapanGridImg
                  key={img}
                  src={img}
                  alt={`${locationTitle} - ${areaName} ${imgIdx + 1}`}
                  index={imgIdx}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// Osaka special layout: image 1 full width, then image 4 left spanning 2 rows, images 2+3 stacked right
function OsakaGallery({ images, locationTitle }: { images: string[]; locationTitle: string }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Image 1: horizontal full width */}
      <JapanImg
        src={images[0]}
        alt={`${locationTitle} - Osaka 1`}
        index={0}
      />
      {/* Image 4 left (2 rows), Images 2+3 stacked right */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" style={{ minHeight: "600px" }}>
        <JapanImg
          src={images[3]}
          alt={`${locationTitle} - Osaka 4`}
          index={3}
          className="h-full"
        />
        <div className="flex flex-col gap-4">
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <JapanImg
              src={images[1]}
              alt={`${locationTitle} - Osaka 2`}
              index={1}
              className="h-full"
            />
          </div>
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <JapanImg
              src={images[2]}
              alt={`${locationTitle} - Osaka 3`}
              index={2}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Kyoto: [1,2], [3,4], [5,6,7], [8,9]
const KYOTO_ROWS: { imgs: number[]; cols: number }[] = [
  { imgs: [0, 1], cols: 2 },
  { imgs: [2, 3], cols: 2 },
  { imgs: [4, 5, 6], cols: 3 },
  { imgs: [7, 8], cols: 2 },
];
// Tokyo: 1,2,3 | 4,5,6 | 7,8,9 (image 4 removed — used as hero)
const TOKYO_ROWS: { imgs: number[]; cols: number }[] = [
  { imgs: [0, 1, 2], cols: 3 },
  { imgs: [3, 4, 5], cols: 3 },
  { imgs: [6, 7, 8], cols: 3 },
];
// Nara: 1 full, 2+3, 4
const NARA_ROWS: { imgs: number[]; cols: number }[] = [
  { imgs: [0], cols: 1 },
  { imgs: [1, 2], cols: 2 },
  { imgs: [3], cols: 1 },
];

// Malaysia: 1 full width, 2+3+4 on 3-grid
const MALAYSIA_ROWS: { imgs: number[]; cols: number }[] = [
  { imgs: [0], cols: 1 },
  { imgs: [1, 2, 3], cols: 3 },
];

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
      {/* ===== HERO with optional background image ===== */}
      {(() => {
        const hasHeroBg = slug === "japan" || slug === "malaysia";
        const heroImage = slug === "japan"
          ? "/work/travel-destination/japan/tokyo/4.jpg"
          : slug === "malaysia"
            ? "/work/travel-destination/malaysia/1.jpg"
            : null;
        return (
          <section className="relative bg-black" style={hasHeroBg ? { paddingTop: 0, marginBottom: "-30vh" } : undefined}>
            {heroImage && (
              <>
                <div className="absolute inset-0" style={{ bottom: "-30vh" }}>
                  <Image
                    src={heroImage}
                    alt={`${location.title} hero`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0" style={{ bottom: "-30vh", background: "rgba(0,0,0,0.4)" }} />
                <div className="absolute inset-x-0" style={{ bottom: "-30vh", height: "60%", background: "linear-gradient(to bottom, transparent 0%, black 100%)" }} />
              </>
            )}

            <div className={`relative z-10 mx-auto max-w-[1400px] px-6 md:px-20 ${hasHeroBg ? "flex flex-col justify-end pb-[45vh] pt-24 md:pt-32" : "pt-32 md:pt-44 pb-6 md:pb-10"}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href="/work/travel-destination"
                  className={`font-display mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${hasHeroBg ? "text-white/50 hover:text-white/80" : "text-white/30 hover:text-white/70"}`}
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

              {hasHeroBg && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-6 max-w-xl text-[clamp(15px,1.8vw,20px)] leading-[1.6] font-light text-white/60"
                >
                  {location.description}
                </motion.p>
              )}
            </div>
          </section>
        );
      })()}

      {/* ===== SCROLL DESCRIPTION (skip for locations with hero bg) ===== */}
      {slug !== "japan" && slug !== "malaysia" && (
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <ScrollReveal>
              <p className="max-w-2xl text-[clamp(18px,2.5vw,28px)] leading-[1.5] font-light text-white/50">
                {location.description}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== AREAS WITH HEADERS + PHOTO GALLERIES ===== */}
      {location.areas.map((area, areaIndex) => (
        <section key={area.name} className={`pb-20 md:pb-32 relative ${areaIndex === 0 && (slug === "japan" || slug === "malaysia") ? "z-10" : "bg-black"}`}>
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

            {/* Gallery - custom layouts for Japan/Malaysia, masonry for others */}
            {slug === "japan" ? (
              area.name === "Osaka" ? (
                <OsakaGallery images={area.images} locationTitle={location.title} />
              ) : area.name === "Kyoto" ? (
                <RowGallery images={area.images} rows={KYOTO_ROWS} locationTitle={location.title} areaName={area.name} />
              ) : area.name === "Tokyo" ? (
                <RowGallery images={area.images} rows={TOKYO_ROWS} locationTitle={location.title} areaName={area.name} />
              ) : area.name === "Nara" ? (
                <RowGallery images={area.images} rows={NARA_ROWS} locationTitle={location.title} areaName={area.name} />
              ) : null
            ) : slug === "malaysia" ? (
              <RowGallery images={area.images} rows={MALAYSIA_ROWS} locationTitle={location.title} areaName={area.name} />
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
