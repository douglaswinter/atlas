// apps/p99/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import relay from "vite-plugin-relay";

export default defineConfig({
  plugins: [react(), relay],
  define: {
    global: {},
  },
  // redirect API calls to the backend during development
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://p99-blueapi.diamond.ac.uk",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: path => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
