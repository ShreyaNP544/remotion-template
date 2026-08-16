import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // serve the repo's public folder (fonts, card art) as the site root assets
  publicDir: path.resolve(__dirname, "../public"),
  resolve: {
    // the composition lives in ../src, which would otherwise pull its own
    // copy of remotion from the root node_modules — two copies break the
    // Player's React context ("No video config found")
    dedupe: [
      "react",
      "react-dom",
      "remotion",
      "@remotion/fonts",
      "@remotion/motion-blur",
      "zod",
    ],
    alias: {
      remotion: path.resolve(__dirname, "node_modules/remotion"),
      "@remotion/fonts": path.resolve(__dirname, "node_modules/@remotion/fonts"),
      "@remotion/motion-blur": path.resolve(__dirname, "node_modules/@remotion/motion-blur"),
      zod: path.resolve(__dirname, "node_modules/zod"),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
});
