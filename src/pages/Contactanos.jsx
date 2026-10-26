import { useState } from 'react'
import './Contactanos.css'

// Datos de contacto ficticios
const datosContacto = [
  { emoji: '📍', titulo: 'Dirección', texto: 'Av. Los Aromos 1234, Santiago' },
  { emoji: '📞', titulo: 'Teléfono', texto: '+56 2 2345 6789' },
  { emoji: '✉️', titulo: 'Correo', texto: 'contacto@superfresco.cl' },
  { emoji: '🕒', titulo: 'Horario', texto: 'Lunes a sábado, 9:00 a 21:00' },
]

function Contactanos() {
  // Valores del formulario
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')
  // Indica si ya se envió el mensaje
  const [enviado, setEnviado] = useState(false)

  // Al enviar no recarga la página y muestra el aviso
  function manejarEnvio(e) {
    e.preventDefault()
    setEnviado(true)
    // Se limpian los campos (no se guarda nada)
    setNombre('')
    setCorreo('')
    setMensaje('')
  }

  return (
    <div className="contacto contenedor">
      {/* Título de la página */}
      <header className="contacto-encabezado">
        <h1>Contáctanos</h1>
        <p>Escríbenos si tienes dudas o sugerencias.</p>
      </header>

      <div className="contacto-grilla">
        {/* Tarjeta con los datos de contacto */}
        <section className="contacto-tarjeta contacto-datos">
          <h2>Datos de contacto</h2>
          <ul>
            {datosContacto.map((dato) => (
              <li key={dato.titulo}>
                <span className="dato-icono">{dato.emoji}</span>
                <div>
                  <strong>{dato.titulo}</strong>
                  <p>{dato.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Formulario */}
        <section className="contacto-tarjeta">
          <h2>Envíanos un mensaje</h2>
          <form className="formulario" onSubmit={manejarEnvio}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows="4"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />

            <button type="submit" className="boton formulario-boton">
              Enviar
            </button>
          </form>

          {/* Aviso cuando se envía */}
          {enviado && <p className="mensaje-enviado">✅ Mensaje enviado</p>}
        </section>
      </div>
    </div>
  )
}

export default Contactanos
