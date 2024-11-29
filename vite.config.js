import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet à l'application d'être accessible sur toutes les interfaces réseau
    port: 5173,       // Le port que vous voulez utiliser
    open: true,       // Ouvre automatiquement le navigateur à chaque démarrage
  },
})
