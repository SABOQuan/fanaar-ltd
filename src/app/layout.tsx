import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const avantGarde = localFont({
  src: [
    { path: "../../public/fonts/ITC Avant Garde Gothic Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Book Regular.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-avant-garde",
  display: "swap",
});

const SITE_URL = "https://fanaarltd.com";
const TITLE = "FANAAR | Growth Partner for Pakistan's SMEs";
const DESCRIPTION =
  "Outsourced marketing, business development, and sales partner for Pakistan's growing SMEs. Grow faster without building expensive in-house teams.";

export const metadata: Metadata = {
  // Required for relative Open Graph/Twitter image and canonical URLs (used on the
  // per-page metadata in what-we-do/[slug]/page.tsx) to resolve to full URLs.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Child pages just set `title: pillar.title` and this template appends "| FANAAR" —
    // see generateMetadata in what-we-do/[slug]/page.tsx.
    template: "%s | FANAAR",
  },
  description: DESCRIPTION,
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "FANAAR",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full antialiased ${avantGarde.variable}`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
