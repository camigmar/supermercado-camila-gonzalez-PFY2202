// Sección principal de bienvenida
function Hero() {
  return (
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
  )
}

export default Hero
