
import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// import viteImagemin from 'vite-plugin-imagemin';
// import { visualizer } from "rollup-plugin-visualizer"; // to Analysis compo
// import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
  react(),
  mode === 'production' &&
  sentryVitePlugin({
    org: 'elbeltagy',
    project: 'elbeltagy',
    authToken: import.meta.env.VITE_SENTRY_AUTH_TOKEN, // Use env for security
    release: 'production', // Set dynamically
    sourceMapReference: false, // Avoid source map bloat
  }),
    // Compress images
    // viteImagemin({
    //   gifsicle: { optimizationLevel: 3 },
    //   optipng: { optimizationLevel: 7 },
    //   mozjpeg: { quality: 75 },
    //   pngquant: { quality: [0.65, 0.9], speed: 4 },
    //   svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
    // }),
  ].filter(Boolean), //, visualizer({ open: true }),, viteCompression({ algorithm: 'brotliCompress' })

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
    sourcemap: mode === 'development',
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.webp'],
}));

//build:
// minify: 'terser',
//   terserOptions: {
//     compress: {
//       drop_console: true,
//       drop_debugger: true,
//     },
//   },