import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "XSEN — Cinematic Visual Storytelling",
  description:
    "Premium videography and photography for hospitality, architecture, travel, and commercial brands. Based in Toronto.",
  openGraph: {
    title: "XSEN — Cinematic Visual Storytelling",
    description:
      "Premium videography and photography for hospitality, architecture, travel, and commercial brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
