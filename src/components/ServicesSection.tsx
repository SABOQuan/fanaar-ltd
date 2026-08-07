"use client";

import { useState } from "react";
import Image from "next/image";

const tiers = [
  {
    title: "Tier 1 — Foundation",
    logo: "/logo1-icon.png",
    custom: false,
    duration: "3 Months",
    fee: "PKR 85,000",
    focus: "Stabilization & Launch",
    salesBd: "Basic Lead Gen",
  },
  {
    title: "Tier 2 — Accelerator",
    logo: "/logo2-icon.png",
    custom: false,
    duration: "6 Months",
    fee: "PKR 95,000",
    focus: "Scaling & Acquisition",
    salesBd: "Full Acquisition Suite",
  },
  {
    title: "Tier 3 — Market Leader",
    logo: "/logo3-icon.png",
    custom: false,
    duration: "12 Months",
    fee: "PKR 110,000",
    focus: "Market Dominance",
    salesBd: "Dedicated Sales Mgmt",
  },
  {
    title: "Tier 4: Custom Services",
    logo: "/logo-hole.svg",
    custom: true,
    message: "Fill out the form below for a custom service catered to you.",
  },
] as const;

const detailRows = [
  { label: "Duration", key: "duration" },
  { label: "Core Focus", key: "focus" },
  { label: "Sales / BD", key: "salesBd" },
] as const;

export default function ServicesSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const tier = selected !== null ? tiers[selected] : null;

  return (
    <section
      id="services"
      className="relative min-h-screen bg-fanaar-teal flex flex-col overflow-hidden px-6 sm:px-10 py-16 sm:py-24"
    >
      {/* Background pattern — swapped from the busy flower tile (serviceBGBG.svg) for a
          lighter one, at 50% opacity so it stays subtle behind the cards. */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: "url('/images/textured_svgs/bg-services.svg')",
          backgroundSize: "1551px 770px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="mb-10 sm:mb-16 relative z-10 flex justify-end">
        <span className="text-[30px] sm:text-[34px] font-semibold text-fanaar-cream tracking-widest uppercase">✦ Services</span>
      </div>

      <div className="max-w-6xl mx-auto w-full flex-1 grid lg:grid-cols-[480px_1fr] gap-12 sm:gap-16 lg:gap-32 items-start lg:items-center relative z-10">
        {/* Always-open details card — tilted until a tier is picked, then straightens.
            order-2 on mobile puts this below the tier tiles (matching the mobile reference
            layout); lg:order-1 restores the original desktop order (this card in the narrow
            left column, tiles in the right column). */}
        <div className="order-2 lg:order-1 relative w-full max-w-xs sm:max-w-sm lg:max-w-none mx-auto mt-6 sm:mt-8 lg:mt-10" style={{ aspectRatio: "482/525" }}>
          <div
            className="absolute inset-0 pointer-events-none flex items-start justify-start pt-10 sm:pt-12 lg:pt-16 pl-8 sm:pl-10 lg:pl-14"
          >
            <Image src="/biggerDik.svg" alt="" fill className="object-contain" />
            {!tier && (
              <h3 className="relative z-10 text-fanaar-cream font-bold text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] text-left">
                Select.<br />A.<br />Tier.
              </h3>
            )}
          </div>

          {tier && (
            <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-8 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-16">
              <h3 className="text-fanaar-cream font-bold text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-4 sm:mb-6">
                {tier.title}
              </h3>
              {tier.custom ? (
                <p className="text-sm sm:text-base text-fanaar-cream/85 leading-relaxed">{tier.message}</p>
              ) : (
                detailRows.map((row) => (
                  <div key={row.key} className="w-full flex justify-between border-b border-fanaar-cream/25 py-2 sm:py-3">
                    <span className="text-sm sm:text-base font-semibold text-fanaar-cream">{row.label}</span>
                    <span className="text-sm sm:text-base text-fanaar-cream/85">{tier[row.key]}</span>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="absolute -bottom-6 -left-6 w-28 h-28 sm:-bottom-10 sm:-left-8 sm:w-40 sm:h-40 lg:-bottom-15 lg:-left-14 lg:w-60 lg:h-60 rounded-full overflow-hidden">
            <Image src={tier ? tier.logo : "/logo-hole.svg"} alt="" fill className="object-cover" />
          </div>

          {/* Contact Us — sits in the bottom band next to the logo circle, always available
              regardless of which tier (if any) is selected. */}
          <a
            href="#contact"
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 pointer-events-auto bg-fanaar-cream text-fanaar-brown px-5 py-2 sm:px-6 sm:py-2.5 rounded font-bold text-xs sm:text-sm hover:bg-fanaar-brown hover:text-fanaar-cream transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* Tier toggle cards — now a vertical stack of pill-shaped cards (tier1.svg selected /
            tier2.svg unselected) instead of the 2x2 grid of square tiles, matching the
            reference. order-1 puts this above the details card on mobile; lg:order-2 restores
            the original desktop order (this column to the right of the details card). */}
        <div className="order-1 lg:order-2 flex flex-col gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 lg:ml-auto">
          {tiers.map((t, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={t.title}
                type="button"
                onClick={() => setSelected(isSelected ? null : i)}
                className="relative w-full transition-all duration-300 hover:scale-[1.02] hover:drop-shadow-xl"
                style={{ aspectRatio: "576/111" }}
              >
                <Image
                  src={isSelected ? "/images/textured_svgs/tier1.svg" : "/images/textured_svgs/tier2.svg"}
                  alt=""
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 flex items-center pl-16 sm:pl-20 pr-6 text-left">
                  <h4 className={`text-sm sm:text-base font-bold leading-snug ${isSelected ? "text-fanaar-cream" : "text-fanaar-brown"}`}>
                    {t.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
