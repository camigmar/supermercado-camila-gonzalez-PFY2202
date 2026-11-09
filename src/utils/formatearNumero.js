// Separador de miles chileno: 1500 -> 1.500
const formatoNumero = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 })

// Muestra un número entero con punto de miles (stock, cantidades)
export function formatearNumero(numero) {
  return formatoNumero.format(numero)
}
