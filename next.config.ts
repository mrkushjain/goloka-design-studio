import type { NextConfig } from "next";

// GitHub Pages static export.
// basePath matches the repo name so all assets resolve correctly at
// https://mr.kushjain.github.io/goloka-design-studio/
// Set NEXT_PUBLIC_BASE_PATH="" and add a CNAME if you use a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/goloka-design-studio'

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  // next/image optimisation requires a server; use the browser-native sizes
  // attribute instead for static export.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
