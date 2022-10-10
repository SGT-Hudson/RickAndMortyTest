/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['rickandmortyapi.com'],
  },
};

module.exports = nextConfig;
