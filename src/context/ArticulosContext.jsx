import { useReducer } from 'react'
import { articulosIniciales } from '../data/articulosIniciales'
import { ArticulosContext, ACTIONS } from './articulos'

// Cambia la lista según la acción que llega
function articulosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.AGREGAR_ARTICULO:
      // Se agrega al final con un id único, sin mutar el estado
      return [...state, { ...action.payload, id: Date.now() }]
    default:
      return state
  }
}

// Entrega los artículos y el dispatch a los componentes hijos
export function ArticulosProvider({ children }) {
  const [articulos, dispatch] = useReducer(articulosReducer, articulosIniciales)

  return (
    <ArticulosContext.Provider value={{ articulos, dispatch }}>
      {children}
    </ArticulosContext.Provider>
  )
}
