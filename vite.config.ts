import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeModulePolyfills from "@esbuild-plugins/node-modules-polyfill";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/subscription-graphql/",
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulePolyfills(),
        GlobalsPolyfills({ buffer: true, process: true }),
      ],
      define: {
        global: "globalThis",
      },
    },
  },
});
