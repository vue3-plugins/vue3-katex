// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This maps '@' to your 'src' folder
      '@': path.resolve(__dirname, 'src') 
    }
  },
  build: {
    // This is for building as a library
    lib: {
      entry: path.resolve(__dirname, 'src/plugin.js'), // Point to your library's main entry file
      name: 'Vue3Katex', // The global variable name for the UMD build
      fileName: (format) => `vue3-katex.${format}.js`,
    },
    // This is for Rollup-specific options
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'katex'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          katex: 'katex',
        },
      },
    },
  },
  // Vitest configuration
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
