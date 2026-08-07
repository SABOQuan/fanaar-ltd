import type { MetadataRoute } from "next";

// Required by output: "export" — this route has no dynamic input, so force it static.
export const dynamic = "force-static";

// Generates a static /robots.txt at build time (works fine with output: "export").
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /services and /contact are unstyled leftover scaffold pages, not part of the real
      // site (see the /services, /contact vs #services, #contact distinction) — no reason
      // for search engines to crawl/index them.
      disallow: ["/services", "/contact"],
    },
    sitemap: "https://fanaarltd.com/sitemap.xml",
  };
}
