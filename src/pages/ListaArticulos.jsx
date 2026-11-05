import { useState } from 'react'
import { useArticulos } from '../context/useArticulos'
import { categorias } from '../data/categorias'
import InventoryTable from '../components/InventoryTable.jsx'
import FiltroCategorias from '../components/FiltroCategorias.jsx'
import { formatearPrecio } from '../utils/formatearPrecio'
import { filtrarPorCategoria } from '../utils/filtrarPorCategoria'

// Columnas que se muestran en esta página
const columnas = [
  {
    titulo: 'Nombre',
    alineacion: 'izquierda',
    render: (a) => <span className="font-semibold text-[var(--verde-oscuro)]">{a.nombre}</span>,
  },
  { titulo: 'Marca', alineacion: 'izquierda', render: (a) => a.marca },
  {
    titulo: 'Tipo',
    alineacion: 'izquierda',
    render: (a) => <span className="text-[var(--texto-suave)]">{a.tipo}</span>,
  },
  { titulo: 'Stock', alineacion: 'derecha', render: (a) => `${a.stock} un.` },
  {
    titulo: 'Precio',
    alineacion: 'derecha',
    render: (a) => <span className="font-semibold">{formatearPrecio(a.precio)}</span>,
  },
]

// Página con la tabla de todos los artículos
function ListaArticulos() {
  const { articulos } = useArticulos()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')

  // La lista filtrada se calcula en cada render, no se guarda en un estado
  const articulosFiltrados = filtrarPorCategoria(articulos, categoriaSeleccionada)

  // Mensaje distinto si el inventario está vacío o solo la categoría
  const mensajeVacio =
    articulos.length === 0 ? 'No hay artículos registrados.' : 'No hay artículos en esta categoría.'

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-8">
      <h1 className="mb-6 text-3xl font-bold">Inventario de artículos</h1>

      <FiltroCategorias
        categorias={categorias}
        seleccionada={categoriaSeleccionada}
        alCambiar={setCategoriaSeleccionada}
      />

      <p className="mb-4 text-sm text-[var(--texto-suave)]" aria-live="polite">
        Mostrando {articulosFiltrados.length} de {articulos.length} artículos
      </p>

      <InventoryTable
        articulos={articulosFiltrados}
        columnas={columnas}
        mensajeVacio={mensajeVacio}
      />
    </div>
  )
}

export default ListaArticulos
