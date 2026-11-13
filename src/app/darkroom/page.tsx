import type { Metadata } from "next";
import DarkroomField from "@/components/darkroom/DarkroomField";
import { darkroomItems } from "@/lib/darkroom";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Darkroom",
  description: "Every frame in one dark room, sorted by light: cool to warm, still to moving.",
  path: "/darkroom",
});

export default function DarkroomPage() {
  return (
    <>
      <section className="bg-black pt-32 pb-10 md:pt-44 md:pb-14">
        <div className="mx-auto max-w-[1400px] px-6 md:px-20">
          <h1 className="font-display text-[clamp(60px,15vw,200px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-white/90">
            DARKROOM
          </h1>
          <p className="font-albertian mt-6 max-w-md text-[14px] leading-[1.7] text-white/45">
            Every frame, sorted by light. Cool to warm, still to moving. Move through the dark and the work comes to you.
          </p>
        </div>
      </section>
      <DarkroomField items={darkroomItems} />
    </>
  );
}
