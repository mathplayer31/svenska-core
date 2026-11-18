import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Dossiers générés (build Android, build web, MP3, Supabase) : chaque build en écrit des milliers,
      // et les surveiller provoquait des rafales de rechargements et une fuite mémoire du serveur de dev.
      ignored: ['**/android/**', '**/dist/**', '**/public/audio/**', '**/supabase/**'],
    },
  },
})
