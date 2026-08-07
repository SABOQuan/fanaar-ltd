"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { pillars } from "@/lib/pillars";

gsap.registerPlugin(SplitText);

export default function WhatWeDo() {
  const descRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const splitRefs = useRef<Record<string, SplitText | null>>({});

  useEffect(() => {
    const splits = splitRefs.current;
    return () => {
      for (const split of Object.values(splits)) split?.revert();
    };
  }, []);

  // The CSS group-hover (max-height + opacity, see the card markup) handles the actual
  // show/hide and the title shifting up to make room. This layers a per-line stagger-in on
  // top of that reveal, purely as a text flourish.
  const handleEnter = useCallback((id: string) => {
    const el = descRefs.current[id];
    if (!el) return;
    splitRefs.current[id]?.revert();
    splitRefs.current[id] = SplitText.create(el, {
      type: "lines",
      onSplit(self) {
        return gsap.fromTo(
          self.lines,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  }, []);

  const handleLeave = useCallback((id: string) => {
    splitRefs.current[id]?.revert();
    splitRefs.current[id] = null;
  }, []);

  return (
    <section id="what-we-do" className="relative bg-fanaar-cream flex flex-col border-t border-fanaar-brown/15 px-6 sm:px-10 pt-8 sm:pt-12 pb-16 sm:pb-24">

      {/* Teal line + star cluster — centered on the Mission/What-we-do boundary above.
          Stars swapped from flat-fill to the user's textured/gradient versions
          (public/*-textured.svg, sourced from Downloads/Fanaar/texturedfiles), matched by
          gradient start color to the flat fill they replace. */}
      <div className="hidden sm:block absolute -top-[340px] -right-16 w-[150px] lg:w-[256px] pointer-events-none">
        <Image src="/TealLine.svg" alt="" width={396} height={932} className="w-full h-auto" />
        <Image
          src="/OrangeStar-textured.svg"
          alt=""
          width={162}
          height={174}
          className="absolute w-[150px] lg:w-[160px] h-auto"
          style={{ top: "45%", right: "85%" }}
        />
        <Image
          src="/BrownStar-textured.svg"
          alt=""
          width={131}
          height={141}
          className="absolute w-[95px] lg:w-[110px] h-auto"
          style={{  top: "62%", right: "69%"  }}
        />
      </div>

      {/* Teal line + star cluster — clipped to the section so it doesn't bleed into Services
          below. Was pink/magenta with an orange + teal star; swirl recolored to teal (the
          shared asset, chonkyPinkSwirl.svg, is only used here so it was safe to edit in
          place) and the teal star swapped for a new magenta variant since TEALStar.svg itself
          is shared with Hero.tsx and shouldn't change there. Both stars here now use the
          textured/gradient variants too. */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute -bottom-65 right-[calc(77.5rem-150px)] w-160 lg:w-160">
          <Image src="/chonkyPinkSwirl.svg" alt="" width={550} height={540} className="w-full h-auto" />
          <Image
            src="/OrangeStar-textured.svg"
            alt=""
            width={162}
            height={174}
            className="absolute w-15 lg:w-35 h-auto"
            style={{ top: "36%", left: "25%" }}
          />
          <Image
            src="/MagentaStar-textured.svg"
            alt=""
            width={108}
            height={115}
            className="absolute w-15 lg:w-25 h-auto"
            style={{ top: "45%", left: "44%" }}
          />
        </div>
      </div>

      <div className="flex flex-col items-start text-left">
        <span className="text-xs font-semibold text-fanaar-brown/60 tracking-widest uppercase mb-4">
          ✦ What We Do
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-fanaar-brown leading-tight max-w-2xl mb-6 sm:mb-8">
          We plug in as your outsourced growth team
        </h2>
      </div>

      <div className="max-w-[100rem] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => (
          <Link
            key={pillar.slug}
            href={`/what-we-do/${pillar.slug}`}
            onMouseEnter={() => handleEnter(pillar.slug)}
            onMouseLeave={() => handleLeave(pillar.slug)}
            // Fixed height (not min-h) — letting the card grow taller on hover was
            // reflowing/pushing everything below it on every hover, which is expensive
            // (layout recalculation, not just paint) and felt laggy. This height is generous
            // enough to fit the revealed description without ever changing the card's size —
            // hover only toggles opacity/max-height *within* this fixed box now. Mobile gets
            // its own (much shorter) height: there's no hover there to reveal the description
            // — tapping just navigates straight to the detail page — so the card only needs
            // to hold the title, not room for a reveal that'll never show.
            className="group relative block w-full h-[150px] sm:h-[340px] rounded-[15%] bg-fanaar-orange-light hover:bg-fanaar-teal hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10">
              <h3 className="text-2xl font-extrabold text-fanaar-brown group-hover:text-fanaar-cream leading-snug transition-colors duration-300">
                {pillar.title}
              </h3>
              <p
                ref={(el) => {
                  descRefs.current[pillar.slug] = el;
                }}
                className="text-sm sm:text-base text-fanaar-brown/90 group-hover:text-fanaar-cream/90 leading-relaxed max-h-0 group-hover:max-h-40 group-hover:mt-4 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-300 ease-out"
              >
                {pillar.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
