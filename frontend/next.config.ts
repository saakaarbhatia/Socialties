import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep minimal config - Turbopack is enabled by default in Next.js 16+
  // Don't set experimental.turbo as it causes build errors in deployment environments
};

export default nextConfig;
