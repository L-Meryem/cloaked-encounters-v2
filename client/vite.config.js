import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
//https://cloaked-encounters-v2.vercel.app
export default defineConfig({
  plugins: [react()],
  base:'/cloaked-encounters-v2/',
  server: {
    // host: '0.0.0.0',
    // port: 8000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
