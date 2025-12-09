import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import path from 'node:path';
import { execSync } from 'node:child_process'
// https://vite.dev/config/
const BUILD_TIME = new Date().toISOString()
let LAST_COMMIT_TIME = ''
try {
  LAST_COMMIT_TIME = execSync('git log -1 --format=%ci').toString().trim()
} catch {}

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    extensions: ['.js','.vue','.json','.ts'],
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  define: {
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(BUILD_TIME),
    'import.meta.env.VITE_LAST_COMMIT_TIME': JSON.stringify(LAST_COMMIT_TIME),
  },
  server: {
    port: 3001,
    open: true,
    cors: true,
  }
})
