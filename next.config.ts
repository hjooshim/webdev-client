import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/labs/lab3": ["./app/labs/lab3/**/*"],
  },
};

export default nextConfig;
