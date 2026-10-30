import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/book-cover-design-2", destination: "/book-cover-design-lp", permanent: true },
      {
        source: "/childrens-book-publishing-illustration",
        destination: "/childrens-book-publishing-illustration-lp",
        permanent: true,
      },
      { source: "/christian-book-publishing", destination: "/christian-book-publishing-lp", permanent: true },
    ];
  },
};

export default nextConfig;
