import type { MetadataRoute } from "next";
import { travelLocations } from "@/lib/data";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/darkroom", "/about", "/contact", ...travelLocations.map((l) => `/work/${l.slug}`)];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
