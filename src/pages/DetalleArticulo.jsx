import { Link, useParams } from 'react-router'
import { useArticulos } from '../context/useArticulos'
import AgregarAlCarro from '../components/AgregarAlCarro.jsx'
import AvisoStock from '../components/AvisoStock.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import { formatearPrecio } from '../utils/formatearPrecio'
import { formatearNumero } from '../utils/formatearNumero'

// Enlace de texto para volver a la lista
const clasesVolver =
  'inline-block rounded text-sm font-semibold text-[var(--verde-medio)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--verde-oscuro)]'

// Página con los datos de un artículo y el botón para agregarlo al carrito
function DetalleArticulo() {
  const { id } = useParams()
  const { articulos, carrito } = useArticulos()

  // Los ids son strings, se compara igual por si acaso
  const articulo = articulos.find((a) => String(a.id) === String(id))

  if (!articulo) {
    return (
      <div className="mx-auto max-w-xl px-4 pt-16 pb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-[var(--verde-oscuro)]">
          Artículo no encontrado
        </h1>
        <p className="mb-6 text-[var(--texto-suave)]">
          El artículo que buscas no existe o fue eliminado.
        </p>
        <Link to="/productos" className={clasesVolver}>
          ← Volver a productos
        </Link>
      </div>
    )
  }

  // Unidades de este artículo que ya están en el carrito
  const enCarrito = carrito.find((item) => item.id === articulo.id)?.cantidad ?? 0

  return (
    <div className="mx-auto max-w-xl px-4 pt-12 pb-8">
      <Link to="/productos" className={`${clasesVolver} mb-4`}>
        ← Volver a productos
      </Link>

      <Tarjeta className="p-6 sm:p-8">
        <p className="mb-1 text-sm text-[var(--texto-suave)]">{articulo.tipo}</p>
        <h1 className="mb-1 text-2xl font-bold text-[var(--verde-oscuro)] sm:text-3xl">
          {articulo.nombre}
        </h1>
        <p className="mb-6 text-[var(--texto-suave)]">{articulo.marca}</p>

        <dl className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-[var(--texto-suave)]">Precio</dt>
            <dd className="text-xl font-bold">{formatearPrecio(articulo.precio)}</dd>
          </div>
          <div>
            <dt className="text-sm text-[var(--texto-suave)]">Stock disponible</dt>
            <dd className="text-xl font-bold" aria-live="polite">
              {formatearNumero(articulo.stock)} un.
              <AvisoStock stock={articulo.stock} />
            </dd>
          </div>
        </dl>

        <AgregarAlCarro articulo={articulo} />

        {enCarrito > 0 && (
          <p className="mt-2 text-sm text-[var(--verde-medio)]" aria-live="polite">
            Tienes {enCarrito} {enCarrito === 1 ? 'unidad' : 'unidades'} en el carrito.{' '}
            <Link to="/carrito" className={clasesVolver}>
              Ir al carrito
            </Link>
          </p>
        )}
      </Tarjeta>
    </div>
  )
}

export default DetalleArticulo
