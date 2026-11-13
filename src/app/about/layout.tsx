import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "I'm Jonathan Xu. I craft cinematic visuals for places that deserve to be seen differently. Based in Singapore.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
