/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  reactStrictMode: false,
  typescript:{
    ignoreBuildErrors:true
  }
};

module.exports = nextConfig;
