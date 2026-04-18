import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yourdogcanstay.com",
        pathname: "/cdn/shop/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/join-the-pack",
        destination: "/donate",
        permanent: true,
      },
      {
        source: "/impact",
        destination: "/transparency",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
