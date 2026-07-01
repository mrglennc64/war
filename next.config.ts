import type { NextConfig } from "next";

const basePath = process.env.WAR_BASEPATH || "";

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // puppeteer must stay a runtime external (loaded from node_modules), never
  // bundled/traced. Without this, a build done before puppeteer was installed
  // bakes a broken hashed external specifier into .next, and the ops scan
  // route 500s at module load for authenticated requests.
  serverExternalPackages: ["puppeteer"],
};

export default nextConfig;
