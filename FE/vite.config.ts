import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// const securityHeaders = {
//   "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
//   "X-Frame-Options": "DENY",
//   "X-Content-Type-Options": "nosniff",
//   "Cross-Origin-Opener-Policy": "same-origin",
//   "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://res.cloudinary.com; media-src 'self' https://res.cloudinary.com; connect-src 'self' https://portofy-be-482363896451.asia-southeast2.run.app wss://portofy-be-482363896451.asia-southeast2.run.app; font-src 'self' data:; frame-ancestors 'none'; require-trusted-types-for 'script';",
// };

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   headers: securityHeaders,
  // },
  // preview: {
  //   headers: securityHeaders,
  // },
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
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-radix": ["radix-ui"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-motion": ["motion", "framer-motion"],
          "vendor-axios": ["axios"],
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
