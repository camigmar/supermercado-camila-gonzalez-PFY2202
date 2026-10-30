// Cuenta cuántos productos hay en una categoría (según su tipo)
export function contarProductos(productos, categoria) {
  return productos.filter((p) => p.tipo === categoria).length
}
