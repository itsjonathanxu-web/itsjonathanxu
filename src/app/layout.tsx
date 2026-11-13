import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/metadata";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { LightboxProvider } from "@/components/Lightbox";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jonathan Xu | Cinematic Visual Storytelling",
  description: "How I see the world.",
  openGraph: {
    title: "Jonathan Xu | Cinematic Visual Storytelling",
    description: "How I see the world.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Jonathan Xu, sunset over the sea from A Symphony of Movement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Xu | Cinematic Visual Storytelling",
    description: "How I see the world.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/lra3nht.css" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <SmoothScroll />
        <LightboxProvider>
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LightboxProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
