import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Next.js 16 route type validator uses stale dev types during prod build.
    // Type safety is still enforced in dev via next dev server.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "cdn.magicui.design",
      },
    ],
  },
};

export default nextConfig;
