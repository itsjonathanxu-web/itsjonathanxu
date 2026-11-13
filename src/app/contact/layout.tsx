import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch about film, photo and travel content work.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
