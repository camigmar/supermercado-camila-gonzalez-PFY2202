import './Home.css'
import { categorias } from '../data/categorias'
import { useArticulos } from '../context/useArticulos'
import { contarProductos } from '../utils/contarProductos'
import Hero from '../components/Hero.jsx'
import CategoryCard from '../components/CategoryCard.jsx'

// Página de inicio que junta las secciones
function Home() {
  // Los productos vienen del estado global
  const { articulos } = useArticulos()

  return (
    <div className="home">
      <Hero />

      {/* Categorías */}
      <section className="seccion">
        <div className="contenedor">
          <h2 className="seccion-titulo">Categorías</h2>
          <div className="categorias">
            {categorias.map((cat) => (
              <CategoryCard
                key={cat.nombre}
                categoria={cat}
                cantidad={contarProductos(articulos, cat.nombre)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
