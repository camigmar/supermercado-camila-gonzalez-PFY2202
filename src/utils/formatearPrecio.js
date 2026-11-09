// Formato de pesos chilenos sin decimales: $1.990, $1.250.000
const formatoPesos = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

// Muestra el precio en pesos chilenos
export function formatearPrecio(precio) {
  return formatoPesos.format(precio)
}
