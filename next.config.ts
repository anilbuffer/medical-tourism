import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/treatments/medical-treatments',
        destination: '/treatments',
        permanent: true,
      },
      {
        source: '/cost',
        destination: '/treatment-costs',
        permanent: true,
      },
      {
        source: '/treatments/health-checkups',
        destination: '/treatments',
        permanent: true,
      },
      {
        source: '/treatments/wellness',
        destination: '/treatments',
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        condition: {
          not: {
            path: "*.module.css",
          },
        },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
