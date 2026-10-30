// Muestra el precio en pesos chilenos
export function formatearPrecio(precio) {
  return precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
}
