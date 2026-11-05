import { Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contactanos from './pages/Contactanos.jsx'
import ListaArticulos from './pages/ListaArticulos.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './layouts/Layout.jsx'

function App() {
  return (
    // Rutas de la app, todas dentro del Layout
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/articulos" element={<ListaArticulos />} />
        <Route path="/articulos/:id" element={<DetalleArticulo />} />
        <Route path="/agregar-articulo" element={<AgregarArticulo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
