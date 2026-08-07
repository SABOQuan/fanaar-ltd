import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { pillars } from "@/lib/pillars";
import ContactSection from "@/components/ContactSection";

// Static export needs every dynamic route pre-rendered at build time.
export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

// Without this, every one of these 4 pages inherited the homepage's exact title/description
// (from the root layout) — duplicate <title> tags across distinct pages is a real SEO
// problem: search engines can't tell the pages apart, and every result shows the same
// generic "FANAAR | Growth Partner..." snippet regardless of which service it's actually for.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) return {};

  return {
    title: pillar.title, // root layout's title.template appends "| FANAAR"
    description: pillar.description,
    openGraph: { title: pillar.title, description: pillar.description, url: `/what-we-do/${pillar.slug}` },
    twitter: { card: "summary", title: pillar.title, description: pillar.description },
    alternates: { canonical: `/what-we-do/${pillar.slug}` },
  };
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) notFound();

  const bandClass = pillar.accent === "teal" ? "bg-fanaar-teal" : "bg-fanaar-magenta";
  const accentTextClass = pillar.accent === "teal" ? "text-fanaar-teal" : "text-fanaar-magenta";

  return (
    <main className="min-h-screen bg-fanaar-cream flex flex-col">
      {/* Colored band — back arrow, then logo + name, in one row. Only the info box overlaps
          it now (a small negative margin below), so this doesn't need to be as tall as when
          the title also overlapped up into it. */}
      <div className={`${bandClass} px-6 sm:px-10 pt-6 sm:pt-8 pb-10 sm:pb-14 md:pb-16`}>
        <div className="flex items-center gap-4">
          <Link href="/#what-we-do" aria-label="Back to What We Do" className="text-fanaar-cream hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo2-icon.png" alt="FANAAR" width={64} height={64} className="shrink-0 w-12 h-12 sm:w-14 sm:h-14" />
            <span className="text-2xl sm:text-3xl font-semibold text-fanaar-brown tracking-wide">FANAAR</span>
          </Link>
        </div>
      </div>

      {/* Service name (raw, no box) + info box (boxed, still overlaps the band a little). No
          longer overlapping the band itself — sits in normal flow below it now. Title sizing
          is deliberately more modest than a "make it huge" instinct would suggest: it has to
          wrap sanely for both a short name ("Branding & Creative") and a long one ("Market
          Intelligence & Research") without either looking tiny or blowing past the column. */}
      <div className="flex-1 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 px-6 sm:px-10 pt-8 sm:pt-10 pb-12 sm:pb-16 max-w-6xl mx-auto w-full relative z-10">
        <h1 className="lg:flex-1 text-[3.3rem] sm:text-[4.125rem] md:text-[4.95rem] font-extrabold uppercase leading-[0.9] text-fanaar-brown">
          {pillar.title}
        </h1>
        <div className="lg:flex-1 -mt-2 sm:-mt-4 md:-mt-6 bg-white border border-fanaar-brown/15 rounded-3xl p-8 sm:p-10 shadow-lg">
          <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-wide mb-4 ${accentTextClass}`}>
            {pillar.tagline}
          </h2>
          <p className="text-base sm:text-lg text-fanaar-brown/90 leading-relaxed mb-8">
            {pillar.description}
          </p>
          <div className="space-y-6">
            {pillar.features.map((feature, i) => (
              <div key={feature.title} className="flex gap-4">
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-fanaar-cream ${bandClass}`}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-fanaar-brown mb-1">{feature.title}</h3>
                  <p className="text-sm text-fanaar-brown/80 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactSection />
    </main>
  );
}
