/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['@prisma/client'],
    },
    images: {
      domains: ['localhost'],
      formats: ['image/webp', 'image/avif'],
    },
    env: {
      CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
    // Enable compression
    compress: true,
    // Performance optimizations
    swcMinify: true,
    // Security headers
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ]
    },
  }
  
  module.exports = nextConfig