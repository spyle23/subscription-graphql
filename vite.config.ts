import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import NodeModulePolyfills from "@esbuild-plugins/node-modules-polyfill";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
});
