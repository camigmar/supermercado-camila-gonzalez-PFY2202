import { formatearPrecio } from '../utils/formatearPrecio'

// Una fila de la tabla con los datos de un producto
function ProductRow({ producto }) {
  return (
    <li className="inventario-fila">
      <span className="producto-nombre">{producto.nombre}</span>
      <span className="producto-categoria">{producto.tipo}</span>
      <span className="producto-stock">
        {producto.stock} un.
        {/* Si hay menos de 10 se avisa */}
        {producto.stock < 10 && <span className="stock-bajo">Stock bajo</span>}
      </span>
      <span className="producto-precio">{formatearPrecio(producto.precio)}</span>
    </li>
  )
}

export default ProductRow
