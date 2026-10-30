import ProductRow from './ProductRow.jsx'

// Tabla con todos los productos del inventario
function InventoryTable({ productos }) {
  return (
    <div className="tarjeta inventario">
      {/* Encabezado, solo se ve en computador */}
      <div className="inventario-fila inventario-encabezado">
        <span>Producto</span>
        <span>Categoría</span>
        <span>Stock</span>
        <span>Precio</span>
      </div>
      <ul className="inventario-lista">
        {productos.map((producto) => (
          <ProductRow key={producto.id} producto={producto} />
        ))}
      </ul>
    </div>
  )
}

export default InventoryTable
