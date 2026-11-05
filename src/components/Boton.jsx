import { Link } from 'react-router'

// Estilo lima del botón del sitio
const clasesBoton =
  'inline-block cursor-pointer rounded-full border-0 bg-[var(--lima)] px-7 py-3 [font-family:inherit] text-base font-semibold text-[var(--verde-oscuro)] no-underline transition-colors hover:bg-[var(--lima-oscuro)] disabled:cursor-not-allowed disabled:bg-[#e0e0e0] disabled:text-[var(--texto-suave)] disabled:hover:bg-[#e0e0e0]'

// Botón reutilizable: si recibe "to" es un enlace, si no es un botón
function Boton({ to, type = 'button', className = '', children, ...props }) {
  const clases = `${clasesBoton} ${className}`

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={clases} {...props}>
      {children}
    </button>
  )
}

export default Boton
