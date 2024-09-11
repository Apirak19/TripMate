/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com"], // Add this line to allow images from pixabay
  },
};

export default nextConfig;
