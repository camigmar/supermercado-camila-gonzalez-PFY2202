import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/global.css'
import './styles/tailwind.css'
import App from './App.jsx'
import { ArticulosProvider } from './context/ArticulosContext.jsx'

// Ruta base del sitio (la "base" de vite.config.js), sin la barra final
const rutaBase = import.meta.env.BASE_URL.replace(/\/$/, '')

// BrowserRouter envuelve la app para poder usar las rutas
// ArticulosProvider comparte la lista de artículos
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={rutaBase}>
      <ArticulosProvider>
        <App />
      </ArticulosProvider>
    </BrowserRouter>
  </StrictMode>,
)
