import { createContext } from 'react'

// Contexto para compartir los artículos y el carrito en toda la app
export const ArticulosContext = createContext(null)

// Acciones que puede hacer el reducer
export const ACTIONS = {
  AGREGAR_ARTICULO: 'AGREGAR_ARTICULO',
  AGREGAR_AL_CARRITO: 'AGREGAR_AL_CARRITO',
  AUMENTAR_CANTIDAD: 'AUMENTAR_CANTIDAD',
  DISMINUIR_CANTIDAD: 'DISMINUIR_CANTIDAD',
  QUITAR_DEL_CARRITO: 'QUITAR_DEL_CARRITO',
}
