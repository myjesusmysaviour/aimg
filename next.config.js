/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['myjesusmysaviour.github.io/aimg'], // Add the domain of your image source
  },
}

module.exports = nextConfig
