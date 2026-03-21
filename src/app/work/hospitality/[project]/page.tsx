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
// GALLERY IMAGE
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

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-black pt-32 pb-6 md:pt-44 md:pb-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/work/hospitality"
              className="font-display mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-white/30 uppercase transition-colors duration-300 hover:text-white/70"
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
            className="font-display text-[clamp(56px,14vw,200px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90"
          >
            {project.title.toUpperCase()}
          </motion.h1>
        </div>
      </section>

      {/* ===== DESCRIPTION ===== */}
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

      {/* ===== PHOTO GALLERY ===== */}
      <section className="bg-black pb-20 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {project.images.map((img, i) => (
              <GalleryImage
                key={img}
                src={img}
                alt={`${project.title} ${i + 1}`}
                index={i}
              />
            ))}
          </div>
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
