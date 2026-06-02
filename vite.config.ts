import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode'

export default defineConfig({
  // './' garante que os assets funcionem no GitHub Pages (/repo-name/assets/...)
  base: './',
  plugins: [react(), qrcode()],
  server: {
    port: 3000,
    host: true,
    open: false,
  }
})
