/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    // Warnings/errors won't block production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
