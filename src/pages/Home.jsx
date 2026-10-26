import './Home.css'

// Productos de ejemplo del inventario
const productos = [
  { id: 1, nombre: 'Manzana roja (kg)', categoria: 'Frutas y verduras', stock: 42, precio: 1890 },
  { id: 2, nombre: 'Lechuga', categoria: 'Frutas y verduras', stock: 6, precio: 990 },
  { id: 3, nombre: 'Leche entera 1 L', categoria: 'Lácteos', stock: 35, precio: 1150 },
  { id: 4, nombre: 'Yogur natural', categoria: 'Lácteos', stock: 4, precio: 450 },
  { id: 5, nombre: 'Arroz 1 kg', categoria: 'Abarrotes', stock: 60, precio: 1590 },
  { id: 6, nombre: 'Agua mineral 1,5 L', categoria: 'Bebidas', stock: 9, precio: 890 },
]

// Categorías con su emoji y la clase del color de fondo
const categorias = [
  { nombre: 'Frutas y verduras', emoji: '🥕', clase: 'icono-frutas' },
  { nombre: 'Lácteos', emoji: '🥛', clase: 'icono-lacteos' },
  { nombre: 'Abarrotes', emoji: '🥫', clase: 'icono-abarrotes' },
  { nombre: 'Bebidas', emoji: '🥤', clase: 'icono-bebidas' },
]

// Cuenta cuántos productos hay en una categoría
function contarProductos(categoria) {
  return productos.filter((p) => p.categoria === categoria).length
}

// Muestra el precio en pesos chilenos
function formatearPrecio(precio) {
  return precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
}

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
                  {contarProductos(cat.nombre)}{' '}
                  {contarProductos(cat.nombre) === 1 ? 'producto' : 'productos'}
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
