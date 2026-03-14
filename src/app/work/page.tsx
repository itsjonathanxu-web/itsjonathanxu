"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { categories } from "@/lib/data";

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-black pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <FadeIn>
            <p className="mb-4 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
              Portfolio
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-[40px] font-light tracking-[-0.02em] text-white md:text-[64px]">
              Work
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-[#8A8A8A] md:text-lg">
              Cinematic videography and photography across hospitality,
              architecture, travel, and commercial projects.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Grid */}
      <section className="bg-black pb-24 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 0.1}>
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
                  {/* Permanent dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/30" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <p className="text-[11px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase">
                      0{i + 1}
                    </p>
                    <h2 className="mt-2 text-2xl font-light text-white md:text-3xl">
                      {cat.title}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#F5F5F5]/60">
                      {cat.description}
                    </p>
                    <span className="mt-4 text-[12px] tracking-[0.1em] text-white/50 uppercase transition-colors group-hover:text-white">
                      View Projects &rarr;
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1A1A1A] bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
          <FadeIn>
            <h2 className="text-2xl font-light text-white md:text-4xl">
              Interested in working together?
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-block border border-white/80 px-10 py-4 text-[13px] font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
