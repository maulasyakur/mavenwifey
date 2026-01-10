import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ViteImageOptimizer()],
  server: { allowedHosts: ["891aa6bea567.ngrok-free.app"] },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
