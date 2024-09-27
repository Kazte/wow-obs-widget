/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['render.worldofwarcraft.com']
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
