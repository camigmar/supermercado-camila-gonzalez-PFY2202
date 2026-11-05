// Suma precio * cantidad de todos los ítems del carrito
export function calcularTotal(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0)
}
