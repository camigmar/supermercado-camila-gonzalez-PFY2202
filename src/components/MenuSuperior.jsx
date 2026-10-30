import { NavLink } from 'react-router-dom'

// Clases del enlace, cambian si es la página actual
function clasesEnlace({ isActive }) {
  const base =
    'flex-1 sm:flex-none rounded-full px-4 py-2 text-center text-sm font-medium no-underline transition-colors'
  return isActive
    ? `${base} bg-[var(--lima)] font-bold text-[var(--verde-oscuro)]`
    : `${base} text-[var(--blanco)] hover:bg-[var(--verde-medio)]`
}

// Menú de arriba para las páginas de artículos
function MenuSuperior() {
  return (
    <nav className="bg-[var(--verde-oscuro)] py-3">
      <div className="mx-auto flex max-w-[1100px] gap-2 px-4 sm:justify-end">
        <NavLink to="/articulos" className={clasesEnlace}>
          Inventario de artículos
        </NavLink>
        <NavLink to="/agregar-articulo" className={clasesEnlace}>
          Agregar artículo
        </NavLink>
      </div>
    </nav>
  )
}

export default MenuSuperior
