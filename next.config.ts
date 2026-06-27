import type { NextConfig } from "next";
import path from "path";

// The `pagedjs` package's `src` entry trips a CommonJS/ESM interop bug
// ("contains.call is not a function") in its clear-cut dependency when bundled.
// Its prebuilt `dist/paged.esm.js` has the interop resolved, but the package's
// `exports` map blocks importing that subpath directly, so we alias the bare
// `pagedjs` specifier to it for both bundlers.
const pagedjsEsmAbs = path.resolve(__dirname, "node_modules/pagedjs/dist/paged.esm.js");

const nextConfig: NextConfig = {
  turbopack: {
    // Turbopack resolves alias paths relative to the project root and does not
    // accept absolute Windows paths here.
    resolveAlias: {
      pagedjs: "./node_modules/pagedjs/dist/paged.esm.js",
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = { ...(config.resolve.alias || {}), pagedjs: pagedjsEsmAbs };
    return config;
  },
};

export default nextConfig;
