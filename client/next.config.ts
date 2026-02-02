import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // You can keep domains, formats, loader, etc.
    // No 'quality' here
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
