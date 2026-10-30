import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import MenuInferior from '../components/MenuInferior.jsx'
import MenuSuperior from '../components/MenuSuperior.jsx'

// Estructura que comparten todas las páginas
// El body ya tiene espacio abajo para que el menú no tape el footer
function Layout() {
  return (
    <>
      {/* Menú de arriba */}
      <MenuSuperior />

      {/* Aquí se muestra la página actual */}
      <Outlet />

      <Footer />

      {/* Menú fijo abajo */}
      <MenuInferior />
    </>
  )
}

export default Layout
