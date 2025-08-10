import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // server: {
    // proxy: {
    //   '/leaderboard': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true
    //   },
    //   '/auth': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true
    //   },
    //   '/admin': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true
    //   }
    // }
  // }
})
