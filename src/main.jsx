import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import './styles/tailwind.css'
import App from './App.jsx'
import { ArticulosProvider } from './context/ArticulosContext.jsx'

// BrowserRouter envuelve la app para poder usar las rutas
// ArticulosProvider comparte la lista de artículos
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ArticulosProvider>
        <App />
      </ArticulosProvider>
    </BrowserRouter>
  </StrictMode>,
)
