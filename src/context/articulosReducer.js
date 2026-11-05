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

// Pasa una unidad del inventario al carrito si queda stock
function sumarAlCarrito(state, id) {
  const articulo = state.articulos.find((a) => a.id === id)
  if (!articulo || articulo.stock <= 0) return state

  const enCarrito = state.carrito.some((item) => item.id === id)
  const carrito = enCarrito
    ? state.carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
    : [...state.carrito, { id, cantidad: 1 }]

  return { articulos: cambiarStock(state.articulos, id, -1), carrito }
}

// Cambia el estado según la acción que llega, sin mutarlo
export function articulosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.AGREGAR_ARTICULO:
      // El id viene en el payload para que el reducer siga siendo puro
      return { ...state, articulos: [...state.articulos, action.payload] }

    case ACTIONS.AGREGAR_AL_CARRITO:
    case ACTIONS.AUMENTAR_CANTIDAD:
      return sumarAlCarrito(state, action.payload)

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
