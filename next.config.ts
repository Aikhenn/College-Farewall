import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["placehold.co","placekitten.com"], // ✅ allow placeholder images
  },
};

export default nextConfig;
