/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["avatars.dicebear.com"],
  },
  dangerouslyAllowSVG: true,
};

module.exports = nextConfig;
