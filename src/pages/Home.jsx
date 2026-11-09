import { categorias } from '../data/categorias'
import { useArticulos } from '../context/useArticulos'
import { contarProductos } from '../utils/contarProductos'
import Hero from '../components/Hero.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import Contenedor from '../components/Contenedor.jsx'
import Seccion from '../components/Seccion.jsx'

// Página de inicio que junta las secciones
function Home() {
  // Los productos vienen del estado global
  const { articulos } = useArticulos()

  return (
    <div>
      <Hero />

      {/* Categorías */}
      <Contenedor>
        <Seccion titulo="Categorías" className="py-8">
          <div className="grid grid-cols-[repeat(2,1fr)] gap-4 md:grid-cols-[repeat(4,1fr)]">
            {categorias.map((cat) => (
              <CategoryCard
                key={cat.nombre}
                categoria={cat}
                cantidad={contarProductos(articulos, cat.nombre)}
              />
            ))}
          </div>
        </Seccion>
      </Contenedor>
    </div>
  )
}

export default Home
