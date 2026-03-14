"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getFeaturedProjects, categories } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-screen items-end overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src="/chile/DSC08349.jpg"
            alt="Cinematic travel landscape"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-20 md:pb-28">
          <FadeIn delay={0.3} duration={0.8}>
            <p className="mb-4 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
              Videography &amp; Photography
            </p>
          </FadeIn>
          <FadeIn delay={0.5} duration={0.8}>
            <h1 className="max-w-3xl text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[72px]">
              Cinematic Visual
              <br />
              Storytelling
            </h1>
          </FadeIn>
          <FadeIn delay={0.7} duration={0.8}>
            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-[#F5F5F5]/70 md:text-lg">
              Crafting compelling visual narratives for hospitality, architecture,
              travel, and commercial brands.
            </p>
          </FadeIn>
          <FadeIn delay={0.9} duration={0.8}>
            <div className="mt-10 flex gap-4">
              <Link
                href="/work"
                className="border border-white/80 px-8 py-3 text-[13px] font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 text-[13px] font-medium tracking-[0.1em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <FadeIn delay={1.2} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-[1px] animate-pulse bg-white/30" />
          </div>
        </FadeIn>
      </section>

      {/* Brief Intro */}
      <section className="bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-6 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
                About
              </p>
              <h2 className="text-2xl font-light leading-relaxed tracking-[-0.01em] text-white md:text-4xl md:leading-relaxed">
                I&apos;m Jonathan Xu — a Toronto-based videographer and
                photographer specializing in cinematic content that makes brands
                unforgettable.
              </h2>
              <Link
                href="/about"
                className="mt-8 inline-block text-[13px] tracking-[0.08em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
              >
                More About Me &rarr;
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Work */}
      <section className="bg-black py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <FadeIn>
            <div className="mb-16 flex items-end justify-between">
              <div>
                <p className="mb-3 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
                  Selected Work
                </p>
                <h2 className="text-3xl font-light tracking-[-0.02em] text-white md:text-5xl">
                  Featured Projects
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden text-[13px] tracking-[0.08em] text-[#8A8A8A] uppercase transition-colors hover:text-white md:block"
              >
                View All &rarr;
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <Link href={`/work/${project.categorySlug}`} className="group relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-8">
                    <p className="text-[11px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase">
                      {project.category}
                    </p>
                    <h3 className="mt-1 text-xl font-light text-white md:text-2xl">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/work"
                className="text-[13px] tracking-[0.08em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
              >
                View All Work &rarr;
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-black py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <FadeIn>
            <p className="mb-12 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
              Services
            </p>
          </FadeIn>
          <div className="grid gap-[1px] md:grid-cols-4">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 0.08}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="group relative block overflow-hidden border-t border-[#1A1A1A] py-8 md:border-t-0 md:border-l md:px-6 md:py-0"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase transition-colors group-hover:text-white">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl font-light text-white">
                      {cat.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#8A8A8A]">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
          <FadeIn>
            <p className="mb-4 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
              Let&apos;s Work Together
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-light tracking-[-0.02em] text-white md:text-5xl">
              Have a project in mind?
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-block border border-white/80 px-10 py-4 text-[13px] font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
