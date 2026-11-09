// Copia dist/index.html como dist/404.html
// GitHub Pages muestra 404.html cuando se recarga una ruta interna (por ejemplo /productos),
// así la app carga igual y React Router muestra la página correcta
import { copyFileSync, existsSync } from 'node:fs'

const origen = 'dist/index.html'
const destino = 'dist/404.html'

if (!existsSync(origen)) {
  console.error(`No existe ${origen}. Ejecuta primero vite build.`)
  process.exit(1)
}

copyFileSync(origen, destino)
console.log(`Copiado ${origen} -> ${destino}`)
