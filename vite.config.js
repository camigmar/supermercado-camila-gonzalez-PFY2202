import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // plugin de tailwind para vite
  plugins: [react(), tailwindcss()],
  // El sitio se publica en GitHub Pages dentro de esta carpeta
  base: '/supermercado-camila-gonzalez-PFY2202/',
})
