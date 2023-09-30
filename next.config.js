/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig, // Include Next.js configuration options

  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};