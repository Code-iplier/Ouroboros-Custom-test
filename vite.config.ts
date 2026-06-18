import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/Ouroboros-Custom-test/",
  plugins: [
    react(),
    {
      name: "inject-app-version",
      transformIndexHtml(html) {
        return html.replace(
          "</head>",
          `<meta name="app-version" content="${process.env.VITE_APP_VERSION || ""}"></head>`
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: "::",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
