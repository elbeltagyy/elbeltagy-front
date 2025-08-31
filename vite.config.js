// import { sentryVitePlugin } from "@sentry/vite-plugin";
// , sentryVitePlugin({
//   org: "elawadii",
//   project: "elbeltagy"
// })
import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{
    name: 'treat-js-files-as-jsx', // *js
    async transform(code, id) {
      if (!id.match(/src\/.*\.js$/)) return null;           // include ts or tsx for TypeScript support 

      // Use the exposed transform from vite, instead of directly
      // transforming with esbuild
      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      });
    },
  }, // pre
  react()],
  optimizeDeps: {
    // force: true,
    esbuildOptions: { // *for enableing js
      loader: {
        '.js': 'jsx',
      },
    },
    exclude: ['blip-ds/loader'] // *file .vite wasnit found
  },

  server: {
    port: 3000,
    host: true
  },

  build: {
    sourcemap: false
  }
});