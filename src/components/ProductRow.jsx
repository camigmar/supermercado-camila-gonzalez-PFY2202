import { claseAlineacion } from '../utils/claseAlineacion'

// Una fila de la tabla: una celda por cada columna
function ProductRow({ articulo, columnas }) {
  return (
    <tr className="border-b border-[#eee] last:border-b-0">
      {columnas.map((columna) => (
        <td
          key={columna.titulo}
          className={`px-5 py-3 whitespace-nowrap ${claseAlineacion(columna.alineacion)}`}
        >
          {columna.render(articulo)}
        </td>
      ))}
    </tr>
  )
}

export default ProductRow
