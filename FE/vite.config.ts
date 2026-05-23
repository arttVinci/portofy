import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: core React + router
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // UI framework
          "vendor-radix": ["radix-ui"],
          // Data fetching
          "vendor-query": ["@tanstack/react-query"],
          // Animation libraries
          "vendor-motion": ["motion", "framer-motion"],
          // HTTP client
          "vendor-axios": ["axios"],
          // Icon libraries (tree-shaken by Rollup in production)
          "vendor-lucide": ["lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
