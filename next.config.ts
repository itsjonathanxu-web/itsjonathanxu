import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Old category URLs. Single-segment params only, so photo paths like
  // /work/travel-destination/chile/1.jpg are never caught by these.
  async redirects() {
    return [
      { source: "/work/travel-destination", destination: "/work", permanent: true },
      { source: "/work/travel-destination/:slug", destination: "/work/:slug", permanent: true },
      { source: "/work/hospitality", destination: "/work", permanent: true },
      { source: "/work/hospitality/:slug", destination: "/work", permanent: true },
      { source: "/work/architecture-interiors", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
