import { articulosIniciales } from '../data/articulosIniciales'
import { ACTIONS } from './articulos'

// Estado con el que parte la app: inventario completo y carrito vacío
export const estadoInicial = {
  articulos: articulosIniciales,
  carrito: [],
}

// Devuelve los artículos con el stock de uno cambiado en "diferencia"
function cambiarStock(articulos, id, diferencia) {
  return articulos.map((articulo) =>
    articulo.id === id ? { ...articulo, stock: articulo.stock + diferencia } : articulo,
  )
}

// Pasa "cantidad" unidades del inventario al carrito, como máximo el stock disponible
function sumarAlCarrito(state, id, cantidad) {
  const articulo = state.articulos.find((a) => a.id === id)
  if (!articulo || articulo.stock <= 0 || !(cantidad >= 1)) return state

  const unidades = Math.min(Math.floor(cantidad), articulo.stock)
  const enCarrito = state.carrito.some((item) => item.id === id)
  const carrito = enCarrito
    ? state.carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + unidades } : item,
      )
    : [...state.carrito, { id, cantidad: unidades }]

  return { articulos: cambiarStock(state.articulos, id, -unidades), carrito }
}

// Cambia el estado según la acción que llega, sin mutarlo
export function articulosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.AGREGAR_ARTICULO:
      // El id viene en el payload para que el reducer siga siendo puro
      return { ...state, articulos: [...state.articulos, action.payload] }

    case ACTIONS.AGREGAR_AL_CARRITO:
      // payload: { id, cantidad }
      return sumarAlCarrito(state, action.payload.id, action.payload.cantidad)

    case ACTIONS.AUMENTAR_CANTIDAD:
      // payload: id, suma de a una unidad
      return sumarAlCarrito(state, action.payload, 1)

    case ACTIONS.DISMINUIR_CANTIDAD: {
      const item = state.carrito.find((i) => i.id === action.payload)
      if (!item) return state

      // Si la cantidad llega a 0 se quita del carrito
      const carrito =
        item.cantidad > 1
          ? state.carrito.map((i) => (i.id === item.id ? { ...i, cantidad: i.cantidad - 1 } : i))
          : state.carrito.filter((i) => i.id !== item.id)

      return { articulos: cambiarStock(state.articulos, item.id, 1), carrito }
    }

    case ACTIONS.QUITAR_DEL_CARRITO: {
      const item = state.carrito.find((i) => i.id === action.payload)
      if (!item) return state

      // Toda la cantidad vuelve al inventario
      return {
        articulos: cambiarStock(state.articulos, item.id, item.cantidad),
        carrito: state.carrito.filter((i) => i.id !== item.id),
      }
    }

    default:
      return state
  }
}
