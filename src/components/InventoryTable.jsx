import Tarjeta from './Tarjeta.jsx'
import ProductRow from './ProductRow.jsx'
import { claseAlineacion } from '../utils/claseAlineacion'

// Tabla configurable: cada página decide qué columnas mostrar
// columnas: [{ titulo, render(articulo), alineacion: 'izquierda' | 'derecha' }]
function InventoryTable({ articulos, columnas, mensajeVacio }) {
  // Si no hay artículos se muestra el mensaje
  if (articulos.length === 0) {
    return <p className="text-[var(--texto-suave)]">{mensajeVacio}</p>
  }

  return (
    // overflow-x-auto para que la tabla se pueda mover en celular
    <Tarjeta className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#eee] text-sm text-[var(--texto-suave)]">
            {columnas.map((columna) => (
              <th
                key={columna.titulo}
                className={`px-5 py-3 font-semibold ${claseAlineacion(columna.alineacion)}`}
              >
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {articulos.map((articulo) => (
            <ProductRow key={articulo.id} articulo={articulo} columnas={columnas} />
          ))}
        </tbody>
      </table>
    </Tarjeta>
  )
}

export default InventoryTable
