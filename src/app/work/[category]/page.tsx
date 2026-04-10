"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  getCategoryBySlug,
  getProjectsByCategory,
  travelLocations,
  categories,
  type Project,
} from "@/lib/data";
import { useLightbox } from "@/components/Lightbox";

const smoothSpring = { stiffness: 60, damping: 20, mass: 0.8 };

// ============================================
// SCROLL REVEAL COMPONENTS
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
// MASONRY-STYLE PHOTO GALLERY
// ============================================

function PhotoGallery({ images, projectTitle }: { images: string[]; projectTitle: string }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {images.map((img, i) => (
        <GalleryImage key={img} src={img} alt={`${projectTitle} ${i + 1}`} index={i} />
      ))}
    </div>
  );
}

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
  const { open } = useLightbox();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    open(src, alt, { x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  };

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className || "mb-4 break-inside-avoid"}>
      <div className="group relative h-full cursor-zoom-in overflow-hidden rounded-xl" onClick={handleClick}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03), transparent, rgba(100,140,255,0.02))",
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// TRAVEL LOCATION CARD
// ============================================

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
              <Image src={location.coverImage} alt={location.title} fill className="object-cover hidden md:block" sizes="100vw" />
            </>
          ) : (
            <Image src={location.coverImage} alt={location.title} fill className="object-cover" sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/90 group-hover:via-black/30" />

          {/* Content overlay */}
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

// ============================================
// HOSPITALITY PROJECT CARD
// ============================================

function HospitalityProjectCard({ project }: { project: Project }) {
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
        href={`/work/hospitality/${project.slug}`}
        className="glass-panel group relative block overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/90 group-hover:via-black/30" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <h3 className="font-display text-[clamp(24px,3vw,40px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:translate-x-1">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-white">Category not found</h1>
          <Link
            href="/work"
            className="font-display mt-4 inline-block text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white"
          >
            &larr; Back to Work
          </Link>
        </div>
      </section>
    );
  }

  const isTravel = slug === "travel-destination";
  const isHospitality = slug === "hospitality";
  const isArchitecture = slug === "architecture-interiors";
  const projects = getProjectsByCategory(slug);
  const otherCategories = categories.filter((c) => c.slug !== slug);

  // Hero background for architecture (uses first project's cover)
  const hasHeroBg = isArchitecture;
  const heroImage = isArchitecture && projects.length > 0 ? projects[0].coverImage : null;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-black" style={hasHeroBg ? { paddingTop: 0, marginBottom: "-30vh" } : undefined}>
        {heroImage && (
          <>
            <div className="absolute inset-0" style={{ bottom: "-30vh" }}>
              <Image
                src={heroImage}
                alt={`${category.title} hero`}
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
              href="/work"
              className={`font-display mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${hasHeroBg ? "text-white/50 hover:text-white/80" : "text-white/30 hover:text-white/70"}`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Work
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(48px,12vw,160px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90"
          >
            {isArchitecture ? (
              <>ARCHITECTURE<br />& INTERIORS</>
            ) : (
              category.title.toUpperCase()
            )}
          </motion.h1>

          {hasHeroBg && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-albertian mt-10 md:mt-14 max-w-xl text-[clamp(15px,1.8vw,20px)] leading-[1.6] font-medium text-white/60"
            >
              {category.description}
            </motion.p>
          )}
        </div>
      </section>

      {/* ===== SCROLL DESCRIPTION (skip for hero bg) ===== */}
      {!hasHeroBg && (
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <ScrollReveal>
              <p className="font-albertian max-w-2xl text-[clamp(15px,1.8vw,20px)] leading-[1.6] font-medium text-white/60">
                {category.description}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== CONTENT -Travel locations, Hospitality venues, OR Project gallery ===== */}
      {isTravel ? (
        <section className="bg-black pb-24 md:pb-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <div className="flex flex-col gap-6">
              {travelLocations.map((location) => (
                <LocationCard key={location.slug} location={location} />
              ))}
            </div>
          </div>
        </section>
      ) : isHospitality ? (
        <section className="bg-black pb-24 md:pb-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-20">
            <div className="flex flex-col gap-6">
              {projects.map((project) => (
                <HospitalityProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {projects.map((project, projIdx) => (
            <section key={project.slug} className={`pb-24 md:pb-40 relative ${projIdx === 0 && hasHeroBg ? "z-10" : "bg-black"}`}>
              <div className="mx-auto max-w-[1400px] px-6 md:px-20">
                {/* Project info */}
                <ScrollReveal>
                  <div className="mb-12 flex flex-col gap-2 md:mb-16">
                    <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-0.03em] text-white">
                      {project.title}
                    </h2>
                    {project.location && (
                      <p className="font-display text-[13px] font-extrabold tracking-[0.3em] text-white/40 uppercase">
                        {project.location}
                        {project.year && ` · ${project.year}`}
                      </p>
                    )}
                  </div>
                </ScrollReveal>

                {/* Photo Gallery - custom layout per project */}
                {project.slug === "marina-one-residences" ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:[aspect-ratio:9/2]">
                    {project.images.map((img, i) => (
                      <GalleryImage key={img} src={img} alt={`${project.title} ${i + 1}`} index={i} className="h-full" />
                    ))}
                  </div>
                ) : project.slug === "gardiner-museum" ? (
                  <div className="flex flex-col gap-4">
                    {/* 2,3,4 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-[1fr]">
                      {project.images.slice(0, 3).map((img, i) => (
                        <GalleryImage key={img} src={img} alt={`${project.title} ${i + 1}`} index={i} className="h-full" />
                      ))}
                    </div>
                    {/* 5 */}
                    <GalleryImage src={project.images[3]} alt={`${project.title} 4`} index={3} className="" />
                    {/* 6 */}
                    <GalleryImage src={project.images[4]} alt={`${project.title} 5`} index={4} className="" />
                    {/* 7,8 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 auto-rows-[1fr]">
                      {project.images.slice(5, 7).map((img, i) => (
                        <GalleryImage key={img} src={img} alt={`${project.title} ${i + 6}`} index={i + 5} className="h-full" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <PhotoGallery images={project.images} projectTitle={project.title} />
                )}
              </div>
            </section>
          ))}
        </>
      )}

      {/* ===== OTHER CATEGORIES ===== */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollReveal>
            <p className="font-display mb-8 text-[11px] font-bold tracking-[0.3em] text-white/25 uppercase">
              Explore More
            </p>
          </ScrollReveal>
          <div className="grid gap-5 md:grid-cols-2">
            {otherCategories.map((cat) => (
              <ScrollReveal key={cat.slug}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group relative block aspect-[16/9] overflow-hidden rounded-xl"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/55" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-display text-[clamp(18px,2vw,28px)] font-extrabold tracking-wide text-white">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
