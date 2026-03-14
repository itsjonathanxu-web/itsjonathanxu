"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -80]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const textOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero — Full screen background photo with large text */}
      <section ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Background photo */}
          <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
            <Image
              src="/chile/DSC08376.jpg"
              alt="Patagonia landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>

          {/* Large statement text */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase"
            >
              About
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-5xl text-[40px] font-extralight leading-[1.1] tracking-[-0.03em] text-white md:text-[80px]"
            >
              The story
              <br />
              behind the lens.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 max-w-xl text-lg font-light leading-relaxed text-[#F5F5F5]/60 md:text-xl"
            >
              Jonathan Xu — videographer, photographer, and the creative behind XSEN.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bio — Large scrolling text blocks */}
      <section className="bg-black py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-[28px] font-extralight leading-[1.4] text-white md:text-[44px] md:leading-[1.35]">
                I&apos;m Jonathan Xu — a videographer and photographer based in
                Toronto, Canada. I create cinematic content for brands that care
                about how their story is told.
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Background + Story */}
      <section className="bg-black py-12 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid items-start gap-16 md:grid-cols-2 md:gap-24">
            {/* Photo */}
            <ScrollReveal>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/about/DSC01568.jpg"
                  alt="Jonathan Xu"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Text blocks */}
            <div className="flex flex-col gap-20 md:pt-24">
              <ScrollReveal>
                <p className="mb-4 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                  Background
                </p>
                <p className="text-lg font-light leading-relaxed text-[#F5F5F5]/80 md:text-xl">
                  My background is in interior design and architecture — I spent
                  years at Partisans, one of Canada&apos;s most innovative
                  architecture studios. That trained my eye for space, light,
                  materiality, and the way a place makes you feel before you
                  can explain why.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <p className="mb-4 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                  The Transition
                </p>
                <p className="text-lg font-light leading-relaxed text-[#F5F5F5]/80 md:text-xl">
                  I carried that sensibility into visual storytelling. Now I
                  work with hotels, restaurants, real estate developers,
                  architects, and tourism brands — creating content that
                  doesn&apos;t just show a space, but makes you feel like
                  you&apos;re already there.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <p className="mb-4 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                  The Approach
                </p>
                <p className="text-lg font-light leading-relaxed text-[#F5F5F5]/80 md:text-xl">
                  My work is cinematic, moody, and intentional. Every frame is
                  considered. I shoot both photography and video — often both
                  in a single project — to give clients a complete visual
                  identity that works across their website, social media, and
                  marketing.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width statement */}
      <section className="bg-black py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-[28px] font-extralight leading-[1.4] text-white md:text-[44px] md:leading-[1.35]">
                When I&apos;m not behind the camera, I&apos;m planning my next
                destination. Travel isn&apos;t just a subject I shoot — it&apos;s
                how I see the world and find the stories worth telling.
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services + Industries grid */}
      <section className="bg-black py-12 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <ScrollReveal>
              <div className="border-t border-[#1A1A1A] pt-8">
                <p className="mb-8 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                  What I Do
                </p>
                <div className="flex flex-col gap-4">
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
                      className="text-lg font-light text-[#F5F5F5]/80"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border-t border-[#1A1A1A] pt-8">
                <p className="mb-8 text-[12px] font-medium tracking-[0.3em] text-[#8A8A8A] uppercase">
                  Clients &amp; Industries
                </p>
                <div className="flex flex-col gap-4">
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
                      className="text-lg font-light text-[#F5F5F5]/80"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1A1A1A] bg-black py-32 md:py-48">
        <ScrollReveal>
          <div className="mx-auto max-w-[1400px] px-6 text-center md:px-20">
            <h2 className="text-[32px] font-extralight tracking-[-0.03em] text-white md:text-[56px]">
              Let&apos;s create something together.
            </h2>
            <Link
              href="/contact"
              className="mt-12 inline-block border border-white/60 px-12 py-5 text-[12px] font-medium tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black"
            >
              Get in Touch
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
