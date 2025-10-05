import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/signin",
        destination: "/api/auth/login",
        permanent: false,
      },
      {
        source: "/signup",
        destination: '/api/auth/login?screen_hint=signup',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
