import type { Metadata } from "next";
import { Inter, Syne, Playfair_Display, Space_Grotesk, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { LightboxProvider } from "@/components/Lightbox";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const SITE_URL = "https://jonathanxu.ca";
const OG_IMAGE = `${SITE_URL}/featured/through-my-eyes-poster.jpg`;

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
        width: 1920,
        height: 1080,
        alt: "Jonathan Xu — Through My Eyes",
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
      <body className={`${inter.variable} ${syne.variable} ${playfair.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
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
