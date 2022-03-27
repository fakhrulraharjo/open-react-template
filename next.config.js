/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    api_url: process.env.NEXT_PUBLIC_API_URL, // Pass through env variables
  },
  experimental: {
    outputStandalone: true,
  },
}

module.exports = nextConfig
