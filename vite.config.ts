import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "473096b1-8352-4670-8eb6-b9842bfa813f.lovableproject.com", // Añade este host aquí
    ],
    proxy: {
      "/api": {
        target: "https://gptengineer.app", // Dominio del origen deseado
        changeOrigin: true,
        secure: false, // Si el servidor tiene HTTPS con certificado autofirmado
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
