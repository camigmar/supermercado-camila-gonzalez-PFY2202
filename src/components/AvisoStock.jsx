// Límite bajo el cual se avisa que queda poco stock
const LIMITE_STOCK_BAJO = 10

// Pastilla roja con texto: "Sin stock" si no queda nada y "Stock bajo" si quedan menos de 10
// Si el stock es suficiente no muestra nada. className sirve para el margen.
function AvisoStock({ stock, className = 'ml-2' }) {
  let texto = ''
  if (stock === 0) texto = 'Sin stock'
  else if (stock > 0 && stock < LIMITE_STOCK_BAJO) texto = 'Stock bajo'

  if (!texto) return null

  return (
    <span
      className={`inline-block rounded-full bg-[var(--rojo-suave)] px-2.5 py-0.5 align-middle text-xs font-semibold whitespace-nowrap text-[var(--rojo)] ${className}`}
    >
      {texto}
    </span>
  )
}

export default AvisoStock
