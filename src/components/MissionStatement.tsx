import Image from "next/image";

export default function MissionStatement() {
  return (
    <section id="about" className="relative min-h-screen bg-fanaar-magenta flex flex-col border-t border-fanaar-cream/15">

      {/* Right-aligned to the whole screen, not just the narrow left column — positioned
          against the section itself rather than living inside that column. */}
      <span className="absolute z-20 top-8 lg:top-14 right-6 sm:right-8 lg:right-16 text-lg sm:text-xl font-bold sm:font-semibold text-fanaar-cream tracking-widest uppercase">
        ✦ Statement
      </span>

      {/* Main content — left label column + right text column. Stacks on mobile. */}
      <div className="flex flex-col lg:flex-row flex-1">

        {/* Left column — narrow, label pinned to top */}
        <div className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-fanaar-cream/20 px-6 sm:px-8 pt-8 pb-4 lg:pt-14 lg:pb-0 relative">
          {/* Decorative sidebar art — desktop only. Fills the sidebar column (bounded by the border-r divider). -top-24 lets the star poke above the section into Hero above; adjust that to tune the poke. */}
          <div className="hidden lg:block absolute -top-24 left-0 right-0 bottom-0">
            <Image src="/MissionSideBar.svg" alt="" fill className="object-cover object-top" />
          </div>
        </div>

        {/* Right column — mission text + CTA */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-12 lg:py-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-fanaar-orange-light leading-tight mb-6 sm:mb-8">
            Hello!
          </h2>
          <p className="text-fanaar-cream text-base sm:text-lg leading-relaxed max-w-2xl mb-4">
            We&apos;re a Pakistan-based Commercial Growth Consultancy helping businesses grow through strategy, branding, marketing, sales, technology and AI.
          </p>
          <p className="text-fanaar-cream text-base sm:text-lg leading-relaxed max-w-2xl">
            We work alongside ambitious founders to build stronger businesses, create meaningful customer experiences and unlock long-term commercial success.
          </p>
        </div>
      </div>

    </section>
  );
}
