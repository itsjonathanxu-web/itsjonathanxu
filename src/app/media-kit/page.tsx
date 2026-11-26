import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

// Hidden page for clients: not in the menu or sitemap, and kept out of search results.
// To update: replace the PDF in public/media-kit and re-render the JPG from it at 3x (3672px wide).
const PDF = "/media-kit/ITSJONATHANXU_MEDIAKIT_2026.pdf";
const IMG = "/media-kit/itsjonathanxu-media-kit-2026.jpg";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Media Kit 2026",
    description: "Jonathan Xu media kit: cinematic travel film and photography, audience and selected works.",
    path: "/media-kit",
    image: "/media-kit/og.jpg",
  }),
  robots: { index: false, follow: false },
};

function Download() {
  return (
    <a
      href={PDF}
      download="ITSJONATHANXU_MEDIAKIT_2026.pdf"
      className="font-display inline-flex shrink-0 items-center gap-3 rounded-full border border-white/25 px-5 py-2.5 whitespace-nowrap md:px-6 md:py-3 text-[11px] font-bold tracking-[0.25em] text-white/80 uppercase transition-colors hover:border-white/60 hover:text-white"
    >
      Download PDF
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M6 1v8m0 0L2.5 5.5M6 9l3.5-3.5M1 11h10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  );
}

export default function MediaKitPage() {
  return (
    <section className="bg-black px-4 pt-24 pb-24 md:px-6 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">Media Kit 2026</p>
          <Download />
        </div>
        {/* Plain img so big screens get the full 3672px render; phones get a larger copy than the screen so pinch-zoomed text stays sharp */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG}
          srcSet={`/img/1080${IMG.replace(".jpg", ".webp")} 1080w, /img/1920${IMG.replace(".jpg", ".webp")} 1920w, ${IMG} 3672w`}
          sizes="(max-width: 768px) 250vw, (max-width: 1432px) 100vw, 1400px"
          width={3672}
          height={4752}
          alt="Jonathan Xu media kit 2026"
          className="h-auto w-full"
        />
        <div className="mt-10 flex justify-center">
          <Download />
        </div>
      </div>
    </section>
  );
}
