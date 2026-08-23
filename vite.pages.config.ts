// Standalone static-site build for GitHub Pages. Deliberately bypasses
// @lovable.dev/vite-tanstack-config (which targets Cloudflare Workers via
// TanStack Start's SSR/nitro pipeline) — this app has no server dependencies
// (mock data only), so it ships as a plain client-rendered SPA instead,
// reusing the real route/component code under src/.
//
// Build: bun run build:pages   Output: dist-pages/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/meridian-pay-flow/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist-pages",
    rollupOptions: {
      input: "index.pages.html",
    },
  },
});
