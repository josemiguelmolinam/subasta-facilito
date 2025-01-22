import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://gptengineer.app",
        changeOrigin: true,
        secure: false,
      },
      "/lovable": {
        target: "https://lovable.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
