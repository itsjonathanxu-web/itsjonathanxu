"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getCategoryBySlug, getProjectsByCategory, categories } from "@/lib/data";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategoryBySlug(slug);
  const projects = getProjectsByCategory(slug);

  if (!category) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-light text-white">Category not found</h1>
          <Link
            href="/work"
            className="mt-4 inline-block text-[13px] tracking-[0.08em] text-[#8A8A8A] uppercase hover:text-white"
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-12 md:px-20 md:pb-16">
          <FadeIn>
            <Link
              href="/work"
              className="mb-6 inline-block text-[13px] tracking-[0.08em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
            >
              &larr; All Work
            </Link>
            <h1 className="text-[40px] font-light tracking-[-0.02em] text-white md:text-[64px]">
              {category.title}
            </h1>
            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-[#F5F5F5]/70 md:text-lg">
              {category.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.08}>
                <div className="group relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-8">
                    <div className="flex items-center gap-3">
                      {project.client && (
                        <span className="text-[11px] tracking-[0.15em] text-[#8A8A8A] uppercase">
                          {project.client}
                        </span>
                      )}
                      <span className="text-[11px] text-[#8A8A8A]/50">
                        {project.type === "both"
                          ? "Photo + Video"
                          : project.type === "video"
                          ? "Video"
                          : "Photo"}
                      </span>
                    </div>
                    <h3 className="mt-1 text-xl font-light text-white md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#F5F5F5]/60">
                      {project.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="border-t border-[#1A1A1A] bg-black py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <FadeIn>
            <p className="mb-8 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
              Explore More
            </p>
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {otherCategories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 0.08}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-lg font-light tracking-wide text-white">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
