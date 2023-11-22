/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'cdn.shopify.com',
      pathname: '/**/*'
    }]
  }
}

module.exports = nextConfig
