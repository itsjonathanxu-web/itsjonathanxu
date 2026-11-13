"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Silent looping cover video. Loads only when it nears the viewport and pauses
 * whenever it scrolls away, so a page never decodes several full-quality
 * videos at once (phones run out of memory and reload the tab otherwise).
 */
export default function CoverVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          // Rejects if nothing is loaded yet; autoPlay starts it once src is set
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={poster}
      className={className}
      muted
      autoPlay
      loop
      playsInline
      preload={shouldLoad ? "auto" : "none"}
    />
  );
}
