import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // You can keep domains, formats, loader, etc.
    // No 'quality' here
    domains: ['res.cloudinary.com'],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
