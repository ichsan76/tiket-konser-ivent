/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marketplace.canva.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img-cdn.pixlr.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
