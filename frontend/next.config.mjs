/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.news18.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ], 
  },
};

export default nextConfig;
