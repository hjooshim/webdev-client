import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const server = process.env.NEXT_PUBLIC_HTTP_SERVER?.replace(/\/$/, "");
    return server
      ? [{ source: "/kambaz-api/:path*", destination: `${server}/api/:path*` }]
      : [];
  },
  outputFileTracingIncludes: {
    "/labs/lab3": ["./app/labs/lab3/**/*"],
  },
};

export default nextConfig;
