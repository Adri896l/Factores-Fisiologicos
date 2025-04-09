import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist', // Asegura que el build vaya a esta carpeta
    emptyOutDir: true // Limpia la carpeta antes de cada build
  }
});
