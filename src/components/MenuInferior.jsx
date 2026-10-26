import { NavLink } from 'react-router-dom'

// Estilo mínimo para dejar el menú fijo abajo
const estiloMenu = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  background: 'white',
  borderTop: '1px solid #ccc',
}

// Marca en negrita la opción activa
function estiloEnlace({ isActive }) {
  return { fontWeight: isActive ? 'bold' : 'normal' }
}

// Menú inferior con los enlaces a las páginas
function MenuInferior() {
  return (
    <nav style={estiloMenu}>
      {/* end hace que Inicio solo quede activo en "/" */}
      <NavLink to="/" end style={estiloEnlace}>
        Inicio
      </NavLink>
      <NavLink to="/quienes-somos" style={estiloEnlace}>
        Quiénes somos
      </NavLink>
      <NavLink to="/contactanos" style={estiloEnlace}>
        Contáctanos
      </NavLink>
    </nav>
  )
}

export default MenuInferior
