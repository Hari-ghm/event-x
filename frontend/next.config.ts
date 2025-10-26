import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // Or for newer Next.js versions, use remotePatterns:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dpfrnd9r6/image/upload/**',
      },
    ],
  },
}

module.exports = nextConfig

export default nextConfig;
