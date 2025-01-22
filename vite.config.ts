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
    allowedHosts: [
      "473096b1-8352-4670-8eb6-b9842bfa813f.lovableproject.com"
    ]
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});