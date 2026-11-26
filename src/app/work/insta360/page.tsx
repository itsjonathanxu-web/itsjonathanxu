import type { Metadata } from "next";
import FilmPage from "@/components/FilmPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insta360 Luna Ultra",
  description: "A product film for the Insta360 Luna Ultra, shot around Singapore’s Gardens by the Bay and Marina Bay.",
  path: "/work/insta360",
  image: "/featured/insta360-card-poster.jpg",
});

// Stills from the film, named by timecode, in film order
const FRAMES = ["00-40-14", "00-40-16", "00-41-00", "00-43-19", "00-44-14", "00-47-09", "00-48-07", "01-05-07", "01-06-23", "01-11-14"].map((t) => `/work/insta360/frames/${t}.jpg`);

export default function Insta360Page() {
  return (
    <FilmPage
      title="Insta360 Luna Ultra"
      description="A product film for the Insta360 Luna Ultra, shot around Singapore’s Gardens by the Bay and Marina Bay."
      video="/featured/insta360-full.mp4"
      poster="/featured/insta360-poster.jpg"
      background="/work/insta360/frames/01-05-07.jpg"
      frames={FRAMES}
      framesHeading="Frames from Film"
      leadFrameFull={false}
    />
  );
}
