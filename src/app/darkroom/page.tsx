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
      <h1 className="sr-only">Darkroom: every frame, sorted by light</h1>
      <DarkroomField items={darkroomItems} />
    </>
  );
}
