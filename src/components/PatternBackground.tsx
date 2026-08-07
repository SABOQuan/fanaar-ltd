// Desktop: the pattern artwork, flush to the top-right corner at its own native aspect ratio
// — not cropped/stretched to fill an arbitrarily-shaped box. Mobile: a full-bleed background
// texture instead (see below). Both are plain <img>s, no interactivity (the old hover-reveal
// grid was scrapped a while back; "hover-pattern3.svg" is just a legacy filename now, not a
// behavior).

// Hard ceiling so the desktop image never blows up past a sane size on huge/ultrawide monitors.
const MAX_WIDTH = 1600;

// Nudges the desktop pattern down slightly so its bottom edge lands closer to where the next
// section (Mission) actually starts, instead of leaving a visible gap above it.
const TOP_OFFSET = 48;

// How big each tile of the mobile background (bg.svg) renders, as a % of the viewport width.
// Below 100% tiles it — repeating smaller copies to still fill the screen completely with no
// gaps or edges (unlike scaling a single object-cover'd copy down, which reveals its box).
// 100% = one copy sized exactly to the screen. Above 100% = one copy, cropped in tighter.
const MOBILE_BG_SIZE = "160%";

export default function PatternBackground() {
  return (
    <>
      {/* Desktop/tablet — sized by width only (capped), height follows the artwork's own
          aspect ratio so it renders undistorted instead of being cropped/zoomed. */}
      <div
        className="hidden sm:block absolute right-0 z-0 overflow-hidden"
        style={{ top: TOP_OFFSET, width: "100%", maxWidth: MAX_WIDTH, aspectRatio: "1551 / 862" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- needs raw aspect-ratio sizing */}
        <img
          src="/hover-pattern3.svg"
          alt=""
          className="w-full h-full"
          style={{
            // Fades the pattern in from its left side. The artwork's own shapes don't actually
            // start until ~32% in (everything before that is blank margin baked into the SVG),
            // so the fade has to extend well past that point or it happens entirely over empty
            // space and is invisible — this goes transparent up to 30%, then fades the real
            // shapes in across 30%-70% instead of cutting them in abruptly.
            maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 70%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 70%)",
          }}
        />
      </div>

      {/* Mobile — the corner-pinned artwork approach didn't work out, so this is now a plain
          full-bleed background texture (bg.svg) covering the whole Hero section at reduced
          opacity, sitting behind the nav/text like a watermark rather than a foreground shape.
          A CSS background (not <img>) so background-size/repeat can tile it — see
          MOBILE_BG_SIZE above for why. */}
      <div
        className="sm:hidden absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: "url('/images/textured_svgs/bg.svg')",
          backgroundSize: MOBILE_BG_SIZE,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}
