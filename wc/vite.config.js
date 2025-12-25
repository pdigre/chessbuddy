import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  publicDir: '../public',
  plugins: [tsconfigPaths()],
  build: {
    watch: false,
    rollupOptions: {
      watch: false,
      treeshake: false,
      preserveEntrySignatures: true,
      output: {
        dynamicImportInCjs: false,
      },
    },
  },
});
