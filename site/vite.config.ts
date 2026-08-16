import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // serve the repo's public folder (fonts, card art) as the site root assets
  publicDir: path.resolve(__dirname, "../public"),
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
});
