import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      input: resolve(__dirname, "src/App.tsx"),
      preserveEntrySignatures: "exports-only",
      external: ["react", "react-dom"],
      output: {
        entryFileNames: "bundle.js",
        format: "esm",
      },
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || "development",
    }),
    terser(),
  ],
}));
