import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import relay from "vite-plugin-relay";

export default defineConfig({
  plugins: [react(), relay],
  define: {
    "process.env": {
      VITE_PVWS_SOCKET: "pvws.diamond.ac.uk",
      VITE_PVWS_SSL: "true",
    },
    global: {},
  },
});
