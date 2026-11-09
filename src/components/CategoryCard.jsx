import Tarjeta from './Tarjeta.jsx'
import IconoCirculo from './IconoCirculo.jsx'

// Tarjeta de una categoría con su cantidad de productos
function CategoryCard({ categoria, cantidad }) {
  return (
    <Tarjeta como="article" className="px-4 py-5 text-center">
      <IconoCirculo className={categoria.clase}>{categoria.emoji}</IconoCirculo>
      <h3 className="mb-1 text-[1rem]">{categoria.nombre}</h3>
      {/* "producto" en singular si hay solo 1 */}
      <p className="text-[0.9rem] text-[var(--texto-suave)]">
        {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
      </p>
    </Tarjeta>
  )
}

export default CategoryCard
