import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API calls to your backend during development
    proxy: {
      "/api": {
        target: "http://portfolio-api:7071",
        changeOrigin: true,
      },
    },
  },
});
