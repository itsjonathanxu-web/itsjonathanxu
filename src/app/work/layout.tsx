import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: "Short films and travel photography from South Korea, Chile, Japan and beyond.",
  path: "/work",
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
