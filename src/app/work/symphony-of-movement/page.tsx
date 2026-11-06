import FilmPage from "@/components/FilmPage";

export default function SymphonyOfMovementPage() {
  return (
    <FilmPage
      title="A Symphony of Movement"
      description="Life is a myriad of change. Moving to a new country, travelling to several more, and experiencing things I've never done before. But I felt as if I was running away from something, constantly chasing excitement and productivity. By staying in constant motion, I was avoiding life in a way that was leaving me out of the present. Instead of fighting the resistance, I realized I should move with the flow of life. To swim with the current. And when we truly feel and listen to what is around us, we can start to notice the beauty in the harmonies of the world."
      video="/featured/symphony-of-movement-full.mp4"
      poster="/featured/symphony-of-movement-poster.jpg"
      frames={Array.from({ length: 55 }, (_, i) => `/work/symphony-of-movement/frame-${String(i + 1).padStart(2, "0")}.jpg`)}
    />
  );
}
