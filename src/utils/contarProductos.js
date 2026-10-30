// Cuenta cuántos productos hay en una categoría
export function contarProductos(productos, categoria) {
  return productos.filter((p) => p.categoria === categoria).length
}
