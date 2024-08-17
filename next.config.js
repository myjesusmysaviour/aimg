/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      STABILITY_API_KEY: process.env.STABILITY_API_KEY,
    },
  }
  
  module.exports = nextConfig