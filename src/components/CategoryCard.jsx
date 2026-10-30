// Tarjeta de una categoría con su cantidad de productos
function CategoryCard({ categoria, cantidad }) {
  return (
    <article className="tarjeta categoria">
      <div className={`categoria-icono ${categoria.clase}`}>
        {categoria.emoji}
      </div>
      <h3>{categoria.nombre}</h3>
      {/* "producto" en singular si hay solo 1 */}
      <p>
        {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
      </p>
    </article>
  )
}

export default CategoryCard
