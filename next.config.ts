import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = process.env.GITHUB_PAGES === "true"
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
      typescript: { ignoreBuildErrors: true },
    }
  : {};

export default nextConfig;
