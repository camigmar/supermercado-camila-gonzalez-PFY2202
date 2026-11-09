import { Link } from 'react-router'

// Clases que comparten todos los botones
const clasesBase =
  'cursor-pointer rounded-full [font-family:inherit] no-underline transition-colors disabled:cursor-not-allowed'

// Colores de cada variante (incluye el estilo de deshabilitado)
const clasesVariante = {
  primario:
    'border-0 bg-[var(--lima)] text-[var(--verde-oscuro)] hover:bg-[var(--lima-oscuro)] disabled:bg-[#e0e0e0] disabled:text-[var(--texto-suave)] disabled:hover:bg-[#e0e0e0]',
  contorno:
    'border border-[var(--verde-oscuro)] bg-[var(--blanco)] text-[var(--verde-oscuro)] hover:bg-[var(--verde-medio)] hover:text-[var(--blanco)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--verde-oscuro)] disabled:border-[#ccc] disabled:bg-[#f0f0f0] disabled:text-[#999] disabled:hover:bg-[#f0f0f0] disabled:hover:text-[#999]',
}

// Tamaño de cada combinación variante + tamaño
const clasesTamano = {
  primario: {
    normal: 'inline-block px-7 py-3 text-base font-semibold',
    grande: 'inline-block px-10 py-4 text-lg font-bold shadow-[var(--sombra)]',
    chico: 'inline-block px-4 py-2 text-sm font-semibold',
  },
  contorno: {
    normal: 'inline-block px-7 py-3 text-base font-semibold',
    grande: 'inline-block px-10 py-4 text-lg font-bold',
    // Botón redondo pequeño: cantidades (− y +) y "Quitar"
    chico: 'inline-flex h-8 min-w-8 items-center justify-center px-3 text-sm font-bold',
  },
}

// Botón reutilizable: si recibe "to" es un enlace, si no es un botón
// variante: 'primario' | 'contorno'   tamano: 'normal' | 'grande' | 'chico'
// className queda para ubicarlo en la página (márgenes, ancho), no para cambiar su estilo
function Boton({
  to,
  type = 'button',
  variante = 'primario',
  tamano = 'normal',
  className = '',
  children,
  ...props
}) {
  const clases = `${clasesBase} ${clasesVariante[variante]} ${clasesTamano[variante][tamano]} ${className}`

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
