import type { Metadata } from "next";

export const SITE_URL = "https://jonathanxu.ca";
export const SITE_NAME = "Jonathan Xu";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/** Title, description and link preview for one page. Nested openGraph replaces the parent's, so the image is always restated. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
