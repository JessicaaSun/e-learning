/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'istademy-api.istad.co',
        port: '',
        pathname: '/files/**',
      },
      {
        protocol: 'http',
        hostname: '136.228.158.126',
        port: '8003',
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ],
  },
env: {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
}
};

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.js'
);


module.exports = nextConfig