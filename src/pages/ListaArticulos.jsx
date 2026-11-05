import { useArticulos } from '../context/useArticulos'
import InventoryTable from '../components/InventoryTable.jsx'
import { formatearPrecio } from '../utils/formatearPrecio'

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

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-8">
      <h1 className="mb-6 text-3xl font-bold">Inventario de artículos</h1>
      <InventoryTable
        articulos={articulos}
        columnas={columnas}
        mensajeVacio="No hay artículos registrados."
      />
    </div>
  )
}

export default ListaArticulos
