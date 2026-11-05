import { NavLink } from 'react-router'
import { useArticulos } from '../context/useArticulos'

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
  const { carrito } = useArticulos()
  // Total de unidades en el carrito
  const unidades = carrito.reduce((total, item) => total + item.cantidad, 0)

  return (
    <nav className="bg-[var(--verde-oscuro)] py-3">
      <div className="mx-auto flex max-w-[1100px] flex-wrap gap-2 px-4 sm:justify-end">
        <NavLink to="/productos" className={clasesEnlace}>
          Productos
        </NavLink>
        <NavLink
          to="/carrito"
          className={clasesEnlace}
          aria-label={`Carrito, ${unidades} ${unidades === 1 ? 'unidad' : 'unidades'}`}
        >
          Carrito
          <span className="ml-2 inline-block min-w-6 rounded-full bg-[var(--blanco)] px-2 text-xs leading-5 font-bold text-[var(--verde-oscuro)]">
            {unidades}
          </span>
        </NavLink>
        <NavLink to="/agregar-articulo" className={clasesEnlace}>
          Agregar artículo
        </NavLink>
      </div>
    </nav>
  )
}

export default MenuSuperior
