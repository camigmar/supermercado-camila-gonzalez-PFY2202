import { valores } from '../data/valores'
import Contenedor from '../components/Contenedor.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import IconoCirculo from '../components/IconoCirculo.jsx'
import Seccion from '../components/Seccion.jsx'

function QuienesSomos() {
  return (
    <Contenedor className="pt-12 pb-8 md:pt-18">
      {/* Título de la página */}
      <header className="mb-8 text-center">
        <Etiqueta className="mb-3">Conócenos</Etiqueta>
        <h1 className="text-[2.5rem] md:text-[3.5rem]">Quiénes somos</h1>
      </header>

      {/* Qué es, misión y visión */}
      <section className="mb-12 grid gap-4 md:grid-cols-[repeat(3,1fr)]">
        <Tarjeta como="article" className="p-6">
          <h2 className="mb-2 text-[1.3rem]">¿Qué es Super Fresco?</h2>
          <p className="text-[var(--texto-suave)]">
            Super Fresco es un supermercado de barrio que vende frutas, verduras, lácteos,
            abarrotes y bebidas. Usamos este sistema para llevar el control de nuestro
            inventario de forma simple.
          </p>
        </Tarjeta>
        <Tarjeta como="article" className="p-6">
          <h2 className="mb-2 text-[1.3rem]">Misión</h2>
          <p className="text-[var(--texto-suave)]">
            Ofrecer productos frescos y de calidad a nuestros clientes. Para lograrlo, mantenemos
            un inventario ordenado y siempre al día.
          </p>
        </Tarjeta>
        <Tarjeta como="article" className="p-6">
          <h2 className="mb-2 text-[1.3rem]">Visión</h2>
          <p className="text-[var(--texto-suave)]">
            Ser el supermercado de confianza del barrio. Queremos que nunca falte lo que nuestros
            clientes necesitan.
          </p>
        </Tarjeta>
      </section>

      {/* Valores */}
      <Seccion titulo="Nuestros valores">
        <div className="grid gap-4 md:grid-cols-[repeat(3,1fr)]">
          {valores.map((valor) => (
            <Tarjeta como="article" key={valor.titulo} className="p-6 text-center">
              <IconoCirculo className="bg-[var(--lima)]">{valor.emoji}</IconoCirculo>
              <h3 className="mb-1.5 text-[1.1rem]">{valor.titulo}</h3>
              <p className="text-[0.95rem] text-[var(--texto-suave)]">{valor.texto}</p>
            </Tarjeta>
          ))}
        </div>
      </Seccion>
    </Contenedor>
  )
}

export default QuienesSomos
