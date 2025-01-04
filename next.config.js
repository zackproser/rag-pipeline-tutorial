/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      // Add any other domains you need for images
      {
        protocol: 'https',
        hostname: 'picsum.photos',  // For cover image placeholders
      }
    ],
  },
}

module.exports = nextConfig 