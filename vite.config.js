import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig(({ mode }) => ({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre', // Run before other plugins
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react({
      jsxRuntime: 'automatic',
      babel: { plugins: ['@babel/plugin-transform-runtime'] },
    }),
    mode === 'production' &&
    sentryVitePlugin({
      org: 'elbeltagy',
      project: 'elbeltagy',
      authToken: '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',
      release: 'production',
      sourceMapReference: false,
    }),
    visualizer({
      open: mode === 'production',
      filename: 'dist/stats.html',
      gzipSize: true,
    }),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
    }),
  ].filter(Boolean),
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }, // Keep for non-JSX .js files if needed
      keepNames: false,
      treeShaking: true,
    },
    include: ['blip-ds/loader'],
  },
  server: {
    port: 3000,
    host: true,
    hmr: true,
  },
  build: {
    sourcemap: mode === 'development',
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('blip-ds')) return 'vendor-blip';
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg'],
}));