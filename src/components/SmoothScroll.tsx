"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<InstanceType<typeof ScrollSmoother> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // effects: true lets any element carry data-speed/data-lag attributes later
    // (for the star/flower parallax) without needing to touch this setup again.
    // normalizeScroll is intentionally left off — it patches scroll/touch handling at a low
    // level and is a common cause of scroll getting stuck going one direction only, plus it
    // can swallow pointer events elsewhere on the page (e.g. hover states).
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: 1.5,
      effects: true,
    });
    smootherRef.current = smoother;

    return () => {
      smoother.kill();
      smootherRef.current = null;
    };
  }, []);

  // This wraps {children} in the root layout, which doesn't remount on client-side
  // navigation — so the ScrollSmoother instance above persists across page changes and keeps
  // whatever scroll offset you were at on the previous page (e.g. clicking a WhatWeDo card
  // while scrolled down landed on the new page still scrolled down, showing its Contact
  // section instead of the top). Snap back to the top on every route change — unless the URL
  // has a hash (e.g. the pillar pages' back arrow goes to "/#what-we-do"), in which case scroll
  // to that element instead. usePathname() doesn't include the hash, so it's read directly
  // off window.location here.
  useEffect(() => {
    // Refresh first so ScrollTrigger's position math reflects the newly-loaded page's actual
    // content height, not whatever the previous page measured.
    ScrollTrigger.refresh();
    const hash = window.location.hash;
    if (hash) {
      smootherRef.current?.scrollTo(hash, true);
    } else {
      smootherRef.current?.scrollTo(0, false);
    }
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
