import type { MetadataRoute } from "next";
import { pillars } from "@/lib/pillars";

const SITE_URL = "https://fanaarltd.com";

// Required by output: "export" — this route has no dynamic input, so force it static.
export const dynamic = "force-static";

// Generates a static /sitemap.xml at build time (works fine with output: "export").
// Lists the homepage plus every pillar detail page — the /services and /contact scaffold
// routes are intentionally left out (see robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...pillars.map((pillar) => ({
      url: `${SITE_URL}/what-we-do/${pillar.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
