import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contactanos from './pages/Contactanos.jsx'
import Layout from './layouts/Layout.jsx'

function App() {
  return (
    // Rutas de la app, todas dentro del Layout
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contactanos" element={<Contactanos />} />
        {/* Si la ruta no existe se muestra este mensaje */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Route>
    </Routes>
  )
}

export default App
