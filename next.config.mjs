/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: ["@roxom-markets/spark-ui"],
};

export default nextConfig;
