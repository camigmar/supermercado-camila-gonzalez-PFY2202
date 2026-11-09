import Boton from './Boton.jsx'
import Contenedor from './Contenedor.jsx'
import Etiqueta from './Etiqueta.jsx'

// Emojis del cuadro decorativo, cada uno en su propio elemento
const emojis = ['🥬', '🍎', '🥖']

// Sección principal de bienvenida
function Hero() {
  return (
    <section className="py-12 md:py-18">
      <Contenedor className="grid items-center gap-8 md:grid-cols-[1fr_1fr]">
        <div>
          <Etiqueta className="mb-4">Gestión de inventario</Etiqueta>
          <h1 className="mb-3 text-[2.5rem] md:text-[3.5rem]">Super Fresco</h1>
          <p className="mb-6 text-[1.1rem] text-[var(--texto-suave)]">
            Controla el stock de tu supermercado de forma simple y ordenada.
          </p>
          {/* Botón principal para empezar a comprar */}
          <Boton to="/productos" tamano="grande">
            Ir a comprar
          </Boton>
        </div>

        {/* Cuadro decorativo: los emojis van en una sola fila, centrados,
            y su tamaño crece con el ancho de la pantalla */}
        <div
          className="flex min-h-[200px] flex-nowrap items-center justify-center gap-2 rounded-[24px] bg-[var(--verde-oscuro)] px-4 text-[2.75rem] leading-none whitespace-nowrap shadow-[var(--sombra)] sm:text-[4rem] md:min-h-[300px] lg:text-[5rem]"
          aria-hidden="true"
        >
          {emojis.map((emoji) => (
            <span key={emoji}>{emoji}</span>
          ))}
        </div>
      </Contenedor>
    </section>
  )
}

export default Hero
