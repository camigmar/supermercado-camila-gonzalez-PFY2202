import { NavLink } from 'react-router-dom'
import './MenuInferior.css'

// Menú inferior con los enlaces a las páginas
// NavLink agrega la clase "active" a la opción actual
function MenuInferior() {
  return (
    <nav className="menu-inferior">
      {/* end hace que Inicio solo quede activo en "/" */}
      <NavLink to="/" end className="menu-enlace">
        Inicio
      </NavLink>
      <NavLink to="/quienes-somos" className="menu-enlace">
        Quiénes somos
      </NavLink>
      <NavLink to="/contactanos" className="menu-enlace">
        Contáctanos
      </NavLink>
    </nav>
  )
}

export default MenuInferior
