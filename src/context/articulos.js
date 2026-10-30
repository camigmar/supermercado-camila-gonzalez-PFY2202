import { createContext } from 'react'

// Contexto para compartir los artículos en toda la app
export const ArticulosContext = createContext(null)

// Acciones que puede hacer el reducer
export const ACTIONS = {
  AGREGAR_ARTICULO: 'AGREGAR_ARTICULO',
}
