import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Only images.unsplash.com is allowed as a remote source, for the hero /
    // story / product photos (real URLs set in lib/config/site.ts). The logos
    // are local SVGs in /public and need no remote config.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },
};

export default nextConfig;
