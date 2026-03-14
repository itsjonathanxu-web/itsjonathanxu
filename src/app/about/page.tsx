"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <FadeIn>
            <p className="mb-4 text-[13px] font-medium tracking-[0.2em] text-[#8A8A8A] uppercase">
              About
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[64px]">
              The story behind
              <br />
              the lens.
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Photo + Bio */}
      <section className="bg-black pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
            {/* Photo */}
            <FadeIn>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/about/DSC01568.jpg"
                  alt="Jonathan Xu"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            {/* Bio */}
            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-6 md:pt-8">
                <p className="text-lg font-light leading-relaxed text-[#F5F5F5] md:text-xl">
                  I&apos;m Jonathan Xu — a videographer and photographer based in
                  Toronto, Canada. I create cinematic content for brands that care
                  about how their story is told.
                </p>

                <p className="text-base font-light leading-relaxed text-[#8A8A8A]">
                  My background is in interior design and architecture — I spent
                  years at Partisans, one of Canada&apos;s most innovative
                  architecture studios. That trained my eye for space, light,
                  materiality, and the way a place makes you feel before you
                  can explain why.
                </p>

                <p className="text-base font-light leading-relaxed text-[#8A8A8A]">
                  I carried that sensibility into visual storytelling. Now I
                  work with hotels, restaurants, real estate developers,
                  architects, and tourism brands — creating content that
                  doesn&apos;t just show a space, but makes you feel like
                  you&apos;re already there.
                </p>

                <p className="text-base font-light leading-relaxed text-[#8A8A8A]">
                  My work is cinematic, moody, and intentional. Every frame is
                  considered. I shoot both photography and video — often both
                  in a single project — to give clients a complete visual
                  identity that works across their website, social media, and
                  marketing.
                </p>

                <p className="text-base font-light leading-relaxed text-[#8A8A8A]">
                  When I&apos;m not behind the camera, I&apos;m planning my next
                  destination. Travel isn&apos;t just a subject I shoot — it&apos;s
                  how I see the world and find the stories worth telling.
                </p>

                <div className="mt-4 border-t border-[#1A1A1A] pt-8">
                  <p className="mb-4 text-[11px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase">
                    What I Do
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Cinematic Videography",
                      "Photography",
                      "Brand Content",
                      "Destination Marketing",
                      "Real Estate Video",
                      "Commercial Production",
                    ].map((service) => (
                      <span
                        key={service}
                        className="text-sm font-light text-[#F5F5F5]/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-[#1A1A1A] pt-8">
                  <p className="mb-4 text-[11px] font-medium tracking-[0.15em] text-[#8A8A8A] uppercase">
                    Clients &amp; Industries
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Hotels & Resorts",
                      "Restaurants & Bars",
                      "Real Estate",
                      "Interior Design",
                      "Architecture",
                      "Tourism Boards",
                    ].map((industry) => (
                      <span
                        key={industry}
                        className="text-sm font-light text-[#F5F5F5]/80"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1A1A1A] bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
          <FadeIn>
            <h2 className="text-2xl font-light text-white md:text-4xl">
              Let&apos;s create something together.
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
