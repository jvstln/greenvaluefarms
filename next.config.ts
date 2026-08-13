import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Only images.unsplash.com is allowed as a remote source, and ONLY for
    // the placeholder photos (hero / story). The product placeholders are
    // local SVGs in /public/products and need no remote config.
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
