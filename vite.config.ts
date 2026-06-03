import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode'

export default defineConfig({
  // './' garante que os assets funcionem no GitHub Pages (/repo-name/assets/...)
  base: './',
  plugins: [
    react(),
    // Filtra para mostrar apenas o IP real do WiFi (192.168.x.x), ignorando adaptadores virtuais (Hyper-V, WSL, etc.)
    qrcode({ filter: (url) => url.includes('192.168') }),
  ],
  server: {
    port: 3000,
    host: true,
    open: false,
  }
})
