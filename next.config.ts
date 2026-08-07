import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compile the whole site to static HTML/CSS/JS in the `out/` folder.
  // This is what you upload to S3 (served via Cloudflare). No server runtime needed.
  output: "export",

  // S3 static hosting serves /about as /about/index.html, so emit folders.
  trailingSlash: true,

  // next/image optimization needs a server; turn it off for static export.
  images: { unoptimized: true },
};

export default nextConfig;
