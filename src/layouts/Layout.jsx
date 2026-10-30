import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import MenuInferior from '../components/MenuInferior.jsx'
import MenuSuperior from '../components/MenuSuperior.jsx'

// Estructura que comparten todas las páginas
// El body ya tiene espacio abajo para que el menú no tape el footer
function Layout() {
  return (
    <>
      {/* Columna del alto de la pantalla (menos el espacio del menú de abajo) */}
      <div className="flex min-h-[calc(100vh-var(--espacio-menu))] flex-col">
        {/* Menú de arriba */}
        <MenuSuperior />

        {/* Aquí se muestra la página actual, ocupa el espacio que sobra */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* El footer queda siempre abajo */}
        <Footer />
      </div>

      {/* Menú fijo abajo */}
      <MenuInferior />
    </>
  )
}

export default Layout
