"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import PatternBackground from "./PatternBackground";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#what-we-do", label: "What we do" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact us" },
];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  // These are same-page hash links, so they never touch the pathname-based scroll fix in
  // SmoothScroll.tsx (that only fires on route changes). Left to GSAP's automatic
  // anchor-hijacking, clicking one of these could scroll to the section but then only allow
  // scrolling further down, not back up — a symptom of ScrollTrigger's cached scroll bounds
  // going stale. Handling the click explicitly, with a refresh right before the jump, fixes
  // it the same way the cross-page case was fixed.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    ScrollTrigger.refresh();
    ScrollSmoother.get()?.scrollTo(href, true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* Section background — a designed gradient (was a flat bg-fanaar-cream). object-cover
          scales/crops to fill the section at any viewport size, no matter its aspect ratio. */}
      <Image
        src="/images/gradient-landingpage.webp"
        alt=""
        fill
        priority
        className="absolute inset-0 object-cover -z-10"
      />

      <PatternBackground />

      {/* Floating nav — no background bar. Stacks on mobile, sits in a row from sm: up. */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 sm:px-10 pt-6 sm:pt-8 pointer-events-none">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2 pointer-events-auto">
          <div className="flex flex-col items-start gap-1 mt-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-2">
            <Image src="/logo2-icon.png" alt="FANAAR" width={64} height={64} className="shrink-0 w-28 h-28 sm:w-20 sm:h-20" />
            <span className="text-4xl sm:text-[34px] font-semibold text-fanaar-brown tracking-wide">FANAAR</span>
          </div>

          {/* Hamburger — mobile only, toggles the link panel below */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-fanaar-brown text-fanaar-cream shadow-md shrink-0"
          >
            {menuOpen ? (
              <span className="text-xl leading-none">&times;</span>
            ) : (
              <span className="flex flex-col gap-[3px]">
                <span className="block w-4 h-0.5 bg-fanaar-cream rounded-full" />
                <span className="block w-4 h-0.5 bg-fanaar-cream rounded-full" />
                <span className="block w-4 h-0.5 bg-fanaar-cream rounded-full" />
              </span>
            )}
          </button>
        </div>

        {/* Desktop nav — unchanged, always visible from sm: up */}
        <nav className="hidden sm:flex sm:flex-col items-end gap-2 pointer-events-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold text-fanaar-brown hover:text-fanaar-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile link panel — only rendered while the hamburger is open */}
        {menuOpen && (
          <nav className="sm:hidden w-full pointer-events-auto flex flex-col gap-3 bg-fanaar-cream border border-fanaar-brown/15 rounded-2xl shadow-lg px-6 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setMenuOpen(false);
                }}
                className="text-lg font-bold text-fanaar-brown hover:text-fanaar-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Teal star — static accent over the pattern. Desktop only: the mobile pattern SVG
          already has its own matching star baked into the artwork, so this would double up. */}
      <Image
        src="/TEALStar.svg"
        alt=""
        width={250}
        height={350}
        className="hidden sm:block absolute sm:top-25 right-10 sm:left-335 z-10 w-[100px] sm:w-[150px] h-auto pointer-events-none"
      />

      {/* Hero text — pinned to lower-left. Mobile: big heading only, no subtext (that's the
          intentional mobile-specific treatment). Desktop (sm: and up): reverts to the
          original laptop sizing, subtext restored. */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 sm:px-10 pb-16 sm:pb-24 max-w-3xl pointer-events-none">
        <h1 className="text-6xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-fanaar-brown">
          Your Partner from Idea to Execution
        </h1>
        <p className="hidden sm:block text-base sm:text-lg text-fanaar-brown mb-10 max-w-md leading-relaxed">
          Most SMEs know they need to grow but lack the time, team, or expertise. We act as your outsourced partner across marketing, business development, and sales.
        </p>
      </div>

    </section>
  );
}
