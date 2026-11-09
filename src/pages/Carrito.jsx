import { Link } from 'react-router'
import { useArticulos } from '../context/useArticulos'
import { ACTIONS } from '../context/articulos'
import InventoryTable from '../components/InventoryTable.jsx'
import Boton from '../components/Boton.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import { formatearPrecio } from '../utils/formatearPrecio'
import { formatearNumero } from '../utils/formatearNumero'
import { combinarCarrito } from '../utils/combinarCarrito'
import { calcularTotal } from '../utils/calcularTotal'

// Las columnas usan dispatch, por eso se arman con una función
function crearColumnas(dispatch) {
  return [
    {
      titulo: 'Artículo',
      alineacion: 'izquierda',
      render: (item) => (
        <Link
          to={`/productos/${item.id}`}
          className="rounded font-semibold text-[var(--verde-oscuro)] underline-offset-4 hover:text-[var(--verde-medio)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--verde-oscuro)]"
        >
          {item.nombre}
        </Link>
      ),
    },
    { titulo: 'Precio', alineacion: 'derecha', render: (item) => formatearPrecio(item.precio) },
    {
      titulo: 'Cantidad',
      alineacion: 'izquierda',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Boton
            variante="contorno"
            tamano="chico"
            aria-label={`Disminuir cantidad de ${item.nombre}`}
            onClick={() => dispatch({ type: ACTIONS.DISMINUIR_CANTIDAD, payload: item.id })}
          >
            −
          </Boton>
          <span className="min-w-6 text-center font-semibold">{formatearNumero(item.cantidad)}</span>
          <Boton
            variante="contorno"
            tamano="chico"
            aria-label={`Aumentar cantidad de ${item.nombre}`}
            disabled={item.stock === 0}
            onClick={() => dispatch({ type: ACTIONS.AUMENTAR_CANTIDAD, payload: item.id })}
          >
            +
          </Boton>
        </div>
      ),
    },
    {
      titulo: 'Subtotal',
      alineacion: 'derecha',
      render: (item) => (
        <span className="font-semibold">{formatearPrecio(item.precio * item.cantidad)}</span>
      ),
    },
    {
      titulo: 'Quitar',
      alineacion: 'derecha',
      render: (item) => (
        <Boton
          variante="contorno"
          tamano="chico"
          aria-label={`Quitar ${item.nombre} del carrito`}
          onClick={() => dispatch({ type: ACTIONS.QUITAR_DEL_CARRITO, payload: item.id })}
        >
          Quitar
        </Boton>
      ),
    },
  ]
}

// Página con los artículos que hay en el carrito
function Carrito() {
  const { articulos, carrito, dispatch } = useArticulos()

  // Se calcula en cada render a partir del estado global
  const items = combinarCarrito(carrito, articulos)
  const total = calcularTotal(items)

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-8">
      <h1 className="mb-6 text-3xl font-bold">Carrito de compras</h1>

      <InventoryTable
        articulos={items}
        columnas={crearColumnas(dispatch)}
        mensajeVacio="Tu carrito está vacío."
      />

      {items.length === 0 ? (
        <Boton to="/productos" className="mt-4">
          Ver productos
        </Boton>
      ) : (
        <Tarjeta className="mt-4 flex items-center justify-between p-5">
          <span className="font-semibold text-[var(--texto-suave)]">Total</span>
          <span className="text-2xl font-bold text-[var(--verde-oscuro)]" aria-live="polite">
            {formatearPrecio(total)}
          </span>
        </Tarjeta>
      )}
    </div>
  )
}

export default Carrito
