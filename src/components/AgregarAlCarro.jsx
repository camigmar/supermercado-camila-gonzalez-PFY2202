import { useEffect, useState } from 'react'
import { useArticulos } from '../context/useArticulos'
import { ACTIONS } from '../context/articulos'
import Boton from './Boton.jsx'
import { clasesBotonChico } from '../utils/estilos'

// Selector de cantidad + botón para agregar un artículo al carro
function AgregarAlCarro({ articulo }) {
  const { dispatch } = useArticulos()
  const [cantidad, setCantidad] = useState(1)
  const [aviso, setAviso] = useState(null)

  const sinStock = articulo.stock === 0
  // Se ajusta al stock actual al renderizar, sin useEffect
  const cantidadElegida = sinStock ? 0 : Math.min(Math.max(cantidad, 1), articulo.stock)

  // El aviso se oculta solo; se limpia el timer si el componente se desmonta
  useEffect(() => {
    if (!aviso) return
    const timer = setTimeout(() => setAviso(null), 2500)
    return () => clearTimeout(timer)
  }, [aviso])

  function agregar() {
    dispatch({
      type: ACTIONS.AGREGAR_AL_CARRITO,
      payload: { id: articulo.id, cantidad: cantidadElegida },
    })
    setCantidad(1)
    // Objeto nuevo para que el timer se reinicie aunque el texto se repita
    setAviso({ texto: `Agregaste ${cantidadElegida} al carro` })
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={clasesBotonChico}
          aria-label={`Disminuir cantidad a agregar de ${articulo.nombre}`}
          disabled={sinStock || cantidadElegida <= 1}
          onClick={() => setCantidad(cantidadElegida - 1)}
        >
          −
        </button>
        <span
          className="min-w-6 text-center font-semibold"
          aria-label={`Cantidad a agregar de ${articulo.nombre}: ${cantidadElegida}`}
        >
          {cantidadElegida}
        </span>
        <button
          type="button"
          className={clasesBotonChico}
          aria-label={`Aumentar cantidad a agregar de ${articulo.nombre}`}
          disabled={sinStock || cantidadElegida >= articulo.stock}
          onClick={() => setCantidad(cantidadElegida + 1)}
        >
          +
        </button>
        <Boton
          className="px-4! py-2! text-sm! whitespace-nowrap"
          aria-label={
            sinStock ? `${articulo.nombre} sin stock` : `Agregar ${articulo.nombre} al carro`
          }
          disabled={sinStock}
          onClick={agregar}
        >
          {sinStock ? 'Sin stock' : 'Agregar al carro'}
        </Boton>
      </div>

      {/* Siempre está en la página para que los lectores de pantalla anuncien el cambio */}
      <p className="mt-1 min-h-4 text-xs font-semibold text-[var(--verde-medio)]" aria-live="polite">
        {aviso?.texto}
      </p>
    </div>
  )
}

export default AgregarAlCarro
