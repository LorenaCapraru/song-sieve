/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 120000, // 120 seconds

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
