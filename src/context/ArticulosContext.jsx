import { useReducer } from 'react'
import { ArticulosContext } from './articulos'
import { articulosReducer, estadoInicial } from './articulosReducer'

// Entrega los artículos, el carrito y el dispatch a los componentes hijos
export function ArticulosProvider({ children }) {
  const [{ articulos, carrito }, dispatch] = useReducer(articulosReducer, estadoInicial)

  return (
    <ArticulosContext.Provider value={{ articulos, carrito, dispatch }}>
      {children}
    </ArticulosContext.Provider>
  )
}
