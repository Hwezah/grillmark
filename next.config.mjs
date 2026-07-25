/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first, WebP fallback — the pack shots and plate are large PNGs and
    // compress far better in both than in the source format.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  // Ship the smaller modular icon/util builds instead of whole barrel files.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
