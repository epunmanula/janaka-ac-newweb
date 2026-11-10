import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'janakaac.lk' }],
        destination: 'https://www.janakaac.lk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'janakaac.vercel.app' }],
        destination: 'https://www.janakaac.lk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'janaka-ac-newweb.vercel.app' }],
        destination: 'https://www.janakaac.lk/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
