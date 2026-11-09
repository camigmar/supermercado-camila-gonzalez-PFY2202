import { NavLink } from 'react-router'

// Clases de cada enlace; la opción actual se ve en verde lima
function clasesEnlace({ isActive }) {
  const base =
    'flex-1 rounded-full px-2 py-2.5 text-center text-[0.9rem] whitespace-nowrap no-underline transition-colors'
  return isActive
    ? `${base} bg-[var(--lima)] font-bold text-[var(--verde-oscuro)]`
    : `${base} font-medium text-[var(--blanco)] hover:bg-[var(--verde-medio)]`
}

// Menú inferior redondeado, fijo abajo y centrado
function MenuInferior() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-10 flex w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 gap-1 rounded-full bg-[var(--verde-oscuro)] p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
      {/* end hace que Inicio solo quede activo en "/" */}
      <NavLink to="/" end className={clasesEnlace}>
        Inicio
      </NavLink>
      <NavLink to="/quienes-somos" className={clasesEnlace}>
        Quiénes somos
      </NavLink>
      <NavLink to="/contactanos" className={clasesEnlace}>
        Contáctanos
      </NavLink>
    </nav>
  )
}

export default MenuInferior
