import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3001,
    open: true,
    cors: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => {
    //       console.log('Original path:', path);
    //       const newPath = path.replace(/^\/api/, '');
    //       console.log('Rewritten path:', newPath);
    //       return newPath;
    //     },
    //   },
    // },
  }
})
