"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCategoryBySlug, getProjectsByCategory, categories } from "@/lib/data";

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

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategoryBySlug(slug);
  const projects = getProjectsByCategory(slug);

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

  const otherCategories = categories.filter((c) => c.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[60vh] min-h-[400px] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-12 md:px-20 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/work"
              className="font-display mb-6 inline-block text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors duration-300 hover:text-white"
            >
              &larr; All Work
            </Link>
            <h1 className="font-display text-[clamp(40px,8vw,80px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
              {category.title.toUpperCase()}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-white/50">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ScrollRevealLine key={project.id}>
                <div className="group relative block aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex items-center gap-3">
                        {project.client && (
                          <span className="font-display text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">
                            {project.client}
                          </span>
                        )}
                        <span className="text-[11px] text-white/30">
                          {project.type === "both"
                            ? "Photo + Video"
                            : project.type === "video"
                            ? "Video"
                            : "Photo"}
                        </span>
                      </div>
                      <h3 className="font-display mt-2 text-[clamp(18px,2vw,24px)] font-extrabold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/50">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollRevealLine>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollRevealLine>
            <p className="font-display mb-8 text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
              Explore More
            </p>
          </ScrollRevealLine>
          <div className="grid gap-5 md:grid-cols-3">
            {otherCategories.map((cat) => (
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
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-display text-[clamp(16px,1.5vw,22px)] font-extrabold tracking-wide text-white">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </ScrollRevealLine>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
