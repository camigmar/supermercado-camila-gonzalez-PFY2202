import { useContext } from 'react'
import { ArticulosContext } from './articulos'

// Hook para usar el contexto más fácil
export function useArticulos() {
  return useContext(ArticulosContext)
}
