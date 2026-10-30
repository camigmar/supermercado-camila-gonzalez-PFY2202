import { Link } from 'react-router-dom'

// Página que se muestra cuando la ruta no existe
function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 pt-16 pb-8 text-center sm:pt-24">
      <div className="mb-4 text-7xl sm:text-8xl" aria-hidden="true">
        🛒
      </div>
      <h1 className="mb-3 text-3xl font-bold text-[var(--verde-oscuro)] sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mb-8 text-[var(--texto-suave)]">
        La dirección que buscas no existe o fue cambiada.
      </p>

      {/* Botón para volver al inicio */}
      <Link
        to="/"
        className="inline-block rounded-full bg-[var(--lima)] px-7 py-3 text-base font-semibold text-[var(--verde-oscuro)] no-underline transition-colors hover:bg-[var(--lima-oscuro)]"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
