import './QuienesSomos.css'
import { valores } from '../data/valores'

function QuienesSomos() {
  return (
    <div className="quienes contenedor">
      {/* Título de la página */}
      <header className="quienes-encabezado">
        <span className="quienes-etiqueta">Conócenos</span>
        <h1>Quiénes somos</h1>
      </header>

      {/* Qué es, misión y visión */}
      <section className="quienes-info">
        <article className="quienes-bloque">
          <h2>¿Qué es Super Fresco?</h2>
          <p>
            Super Fresco es un supermercado de barrio que vende frutas, verduras, lácteos,
            abarrotes y bebidas. Usamos este sistema para llevar el control de nuestro
            inventario de forma simple.
          </p>
        </article>
        <article className="quienes-bloque">
          <h2>Misión</h2>
          <p>
            Ofrecer productos frescos y de calidad a nuestros clientes. Para lograrlo, mantenemos
            un inventario ordenado y siempre al día.
          </p>
        </article>
        <article className="quienes-bloque">
          <h2>Visión</h2>
          <p>
            Ser el supermercado de confianza del barrio. Queremos que nunca falte lo que nuestros
            clientes necesitan.
          </p>
        </article>
      </section>

      {/* Valores */}
      <section className="valores-seccion">
        <h2 className="valores-titulo">Nuestros valores</h2>
        <div className="valores">
          {valores.map((valor) => (
            <article key={valor.titulo} className="valor">
              <div className="valor-icono">{valor.emoji}</div>
              <h3>{valor.titulo}</h3>
              <p>{valor.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default QuienesSomos
