import type { Metadata } from "next";
import FilmPage from "@/components/FilmPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Through My Eyes",
  description: "A short film about showing up somewhere new with nothing but a camera and curiosity.",
  path: "/work/through-my-eyes",
  image: "/featured/through-my-eyes-poster.jpg",
});

export default function ThroughMyEyesPage() {
  return (
    <FilmPage
      title="Through My Eyes"
      description="Some of my greatest memories came from showing up somewhere new with nothing but a camera and curiosity. Living in London, travelling the states, and exploring Asia each broke me free from the familiarity that kept me comfortable. Through that uncertainty came a newfound independence and the passion to chase adventure."
      video="/featured/through-my-eyes-full.mp4"
      poster="/featured/through-my-eyes-poster.jpg"
    />
  );
}
