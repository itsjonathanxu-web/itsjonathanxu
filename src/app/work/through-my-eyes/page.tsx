import type { Metadata } from "next";
import FilmPage from "@/components/FilmPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Through My Eyes",
  description: "A short film about showing up somewhere new with nothing but a camera and curiosity.",
  path: "/work/through-my-eyes",
  image: "/featured/through-my-eyes-poster.jpg",
});

// Stills from the film, named by timecode, in film order
const FRAMES = [
  "eye", "00-08-10", "00-10-03", "00-11-01", "00-11-21", "00-12-19", "00-13-21", "00-14-19", "00-15-09", "00-16-07",
  "00-19-11", "00-20-13", "00-22-01", "00-23-09", "00-24-07", "00-26-13", "00-28-02", "00-30-04", "00-31-01",
  "00-32-00", "00-33-02", "00-33-16", "00-34-05", "00-34-18", "00-38-13", "00-39-05", "00-39-19",
].map((t) => `/work/through-my-eyes/frames/${t}.jpg`);

export default function ThroughMyEyesPage() {
  return (
    <FilmPage
      title="Through My Eyes"
      description="Some of my greatest memories came from showing up somewhere new with nothing but a camera and curiosity. Living in London, travelling the states, and exploring Asia each broke me free from the familiarity that kept me comfortable. Through that uncertainty came a newfound independence and the passion to chase adventure."
      video="/featured/through-my-eyes-full.mp4"
      poster="/featured/through-my-eyes-poster.jpg"
      frames={FRAMES}
      framesHeading="Frames from Film"
      leadFrameFull={false}
    />
  );
}
