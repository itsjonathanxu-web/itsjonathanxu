import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTravelLocationBySlug, travelLocations } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import LocationClient from "./LocationClient";

// Films have their own routes; everything else in the list is a gallery page
const galleryLocations = travelLocations.filter((l) => l.areas.length > 0);

// Unknown slugs get a real 404 instead of a 200 "not found" page
export const dynamicParams = false;

export function generateStaticParams() {
  return galleryLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getTravelLocationBySlug(slug);
  if (!location) return {};
  return pageMetadata({
    title: location.title,
    description: location.tagline ?? location.description,
    path: `/work/${location.slug}`,
    image: location.coverPoster ?? location.coverImage,
  });
}

export default async function TravelLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: slug } = await params;
  if (!galleryLocations.some((l) => l.slug === slug)) notFound();
  return <LocationClient />;
}
