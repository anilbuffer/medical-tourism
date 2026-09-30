/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "assets.co",
      },
    ],
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
};

export default nextConfig;
