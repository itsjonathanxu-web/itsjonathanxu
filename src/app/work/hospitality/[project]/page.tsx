"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { getProjectsByCategory } from "@/lib/data";

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

function GalleryImage({ src, alt, index, className }: { src: string; alt: string; index: number; className?: string }) {
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
    <motion.div ref={ref} style={{ scale, opacity }} className={className || "mb-4 break-inside-avoid"}>
      <div className="group relative h-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
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

export default function HospitalityProjectPage() {
  const params = useParams();
  const slug = params.project as string;
  const projects = getProjectsByCategory("hospitality");
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-white">Project not found</h1>
          <Link
            href="/work/hospitality"
            className="font-display mt-4 inline-block text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white"
          >
            &larr; Back to Hospitality
          </Link>
        </div>
      </section>
    );
  }

  const hasHeroBg = slug === "joia-newmarket";
  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  // Separate drone shot (last image) for Joia
  const galleryImages = hasHeroBg ? project.images.slice(0, -1) : project.images;
  const droneImage = hasHeroBg ? project.images[project.images.length - 1] : null;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-black" style={hasHeroBg ? { paddingTop: 0, marginBottom: "-30vh" } : undefined}>
        {hasHeroBg && (
          <>
            <div className="absolute inset-0" style={{ bottom: "-30vh" }}>
              <Image
                src={project.coverImage}
                alt={`${project.title} hero`}
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
              href="/work/hospitality"
              className={`font-display mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${hasHeroBg ? "text-white/50 hover:text-white/80" : "text-white/30 hover:text-white/70"}`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Hospitality
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(48px,12vw,160px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90"
          >
            {project.title.toUpperCase()}
          </motion.h1>

          {hasHeroBg && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-10 md:mt-14 max-w-xl text-[clamp(15px,1.8vw,20px)] leading-[1.6] font-normal text-white/60"
            >
              {project.description}
            </motion.p>
          )}
        </div>
      </section>

      {/* ===== DESCRIPTION (skip for hero bg pages) ===== */}
      {!hasHeroBg && (
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <ScrollReveal>
              <p className="max-w-2xl text-[clamp(18px,2.5vw,28px)] leading-[1.5] font-light text-white/50">
                {project.description}
              </p>
              {project.location && (
                <p className="font-display mt-4 text-[11px] font-bold tracking-[0.3em] text-white/25 uppercase">
                  {project.location}
                  {project.year && ` · ${project.year}`}
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== PHOTO GALLERY ===== */}
      <section className={`pb-20 md:pb-32 relative ${hasHeroBg ? "z-10" : "bg-black"}`}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          {slug === "joia-newmarket" ? (
            <div className="flex flex-col gap-4">
              {/* 2,3 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 auto-rows-[1fr]">
                {galleryImages.slice(0, 2).map((img, i) => (
                  <GalleryImage key={img} src={img} alt={`${project.title} ${i + 1}`} index={i} className="h-full" />
                ))}
              </div>
              {/* 4,5,6 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[1fr]">
                {galleryImages.slice(2, 5).map((img, i) => (
                  <GalleryImage key={img} src={img} alt={`${project.title} ${i + 3}`} index={i + 2} className="h-full" />
                ))}
              </div>
              {/* 7,8,9 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[1fr]">
                {galleryImages.slice(5, 8).map((img, i) => (
                  <GalleryImage key={img} src={img} alt={`${project.title} ${i + 6}`} index={i + 5} className="h-full" />
                ))}
              </div>
              {/* 10,11,12 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[1fr]">
                {galleryImages.slice(8, 11).map((img, i) => (
                  <GalleryImage key={img} src={img} alt={`${project.title} ${i + 9}`} index={i + 8} className="h-full" />
                ))}
              </div>
              {/* Drone - full width */}
              {droneImage && (
                <GalleryImage src={droneImage} alt={`${project.title} aerial`} index={11} className="" />
              )}
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {project.images.map((img, i) => (
                <GalleryImage key={img} src={img} alt={`${project.title} ${i + 1}`} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== OTHER PROJECTS ===== */}
      {otherProjects.length > 0 && (
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <ScrollReveal>
              <p className="font-display mb-8 text-[11px] font-bold tracking-[0.3em] text-white/25 uppercase">
                More Projects
              </p>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {otherProjects.map((proj) => (
                <ScrollReveal key={proj.slug}>
                  <Link
                    href={`/work/hospitality/${proj.slug}`}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-xl"
                  >
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/55" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-display text-[clamp(16px,1.5vw,22px)] font-extrabold tracking-wide text-white">
                        {proj.title}
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
