import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 🚀 allows deployment even with lint errors
  },
};

export default nextConfig;
