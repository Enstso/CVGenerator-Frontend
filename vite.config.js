import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Assurez-vous que la cible de build est correctement configurée
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },
})
