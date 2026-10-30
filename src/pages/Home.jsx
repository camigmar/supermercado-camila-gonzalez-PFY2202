import './Home.css'
import { productos } from '../data/productos'
import { categorias } from '../data/categorias'
import { contarProductos } from '../utils/contarProductos'
import { formatearPrecio } from '../utils/formatearPrecio'

function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="contenedor hero-contenido">
          <div className="hero-texto">
            <span className="hero-etiqueta">Gestión de inventario</span>
            <h1>Super Fresco</h1>
            <p>Controla el stock de tu supermercado de forma simple y ordenada.</p>
            <a href="#inventario" className="boton">
              Ver inventario
            </a>
          </div>
          <div className="hero-imagen" aria-hidden="true">
            🥬🍎🥖
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="seccion">
        <div className="contenedor">
          <h2 className="seccion-titulo">Categorías</h2>
          <div className="categorias">
            {categorias.map((cat) => (
              <article key={cat.nombre} className="tarjeta categoria">
                <div className={`categoria-icono ${cat.clase}`}>
                  {cat.emoji}
                </div>
                <h3>{cat.nombre}</h3>
                {/* "producto" en singular si hay solo 1 */}
                <p>
                  {contarProductos(productos, cat.nombre)}{' '}
                  {contarProductos(productos, cat.nombre) === 1 ? 'producto' : 'productos'}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inventario */}
      <section className="seccion" id="inventario">
        <div className="contenedor">
          <h2 className="seccion-titulo">Inventario</h2>
          <div className="tarjeta inventario">
            {/* Encabezado, solo se ve en computador */}
            <div className="inventario-fila inventario-encabezado">
              <span>Producto</span>
              <span>Categoría</span>
              <span>Stock</span>
              <span>Precio</span>
            </div>
            <ul className="inventario-lista">
              {productos.map((producto) => (
                <li key={producto.id} className="inventario-fila">
                  <span className="producto-nombre">{producto.nombre}</span>
                  <span className="producto-categoria">{producto.categoria}</span>
                  <span className="producto-stock">
                    {producto.stock} un.
                    {/* Si hay menos de 10 se avisa */}
                    {producto.stock < 10 && <span className="stock-bajo">Stock bajo</span>}
                  </span>
                  <span className="producto-precio">{formatearPrecio(producto.precio)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="pie">
        <div className="contenedor">
          <p className="pie-nombre">🌿 Super Fresco</p>
          <p>Sistema de gestión de inventario</p>
          <p className="pie-copy">© 2026 Super Fresco</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
