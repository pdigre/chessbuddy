import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  publicDir: "../public",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    watch: false,
    rollupOptions: {
      cache: false,
      preserveEntrySignatures: 'strict',
      output: {
        preserveModules: true,
        dynamicImportInCjs: false,
      }
    }
  }
})
