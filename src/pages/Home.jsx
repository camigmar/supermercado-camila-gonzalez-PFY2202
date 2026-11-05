import './Home.css'
import { categorias } from '../data/categorias'
import { useArticulos } from '../context/useArticulos'
import { contarProductos } from '../utils/contarProductos'
import Hero from '../components/Hero.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import InventoryTable from '../components/InventoryTable.jsx'
import { formatearPrecio } from '../utils/formatearPrecio'

// Columnas del inventario de la página de inicio
const columnas = [
  {
    titulo: 'Producto',
    alineacion: 'izquierda',
    render: (a) => <span className="font-semibold text-[var(--verde-oscuro)]">{a.nombre}</span>,
  },
  {
    titulo: 'Categoría',
    alineacion: 'izquierda',
    render: (a) => <span className="text-[0.9rem] text-[var(--texto-suave)]">{a.tipo}</span>,
  },
  {
    titulo: 'Stock',
    alineacion: 'izquierda',
    render: (a) => (
      <>
        {a.stock} un.
        {/* Si hay menos de 10 se avisa */}
        {a.stock < 10 && (
          <span className="ml-2 rounded-full bg-[var(--rojo-suave)] px-2.5 py-0.5 text-xs font-semibold text-[var(--rojo)]">
            Stock bajo
          </span>
        )}
      </>
    ),
  },
  {
    titulo: 'Precio',
    alineacion: 'derecha',
    render: (a) => <span className="font-semibold">{formatearPrecio(a.precio)}</span>,
  },
]

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

      {/* Inventario */}
      <section className="seccion" id="inventario">
        <div className="contenedor">
          <h2 className="seccion-titulo">Inventario</h2>
          <InventoryTable
            articulos={articulos}
            columnas={columnas}
            mensajeVacio="No hay productos en el inventario."
          />
        </div>
      </section>
    </div>
  )
}

export default Home
