import './Contactanos.css'
import { datosContacto } from '../data/contacto'
import CampoFormulario from '../components/CampoFormulario.jsx'
import { useFormulario } from '../hooks/useFormulario'

// Valores vacíos del formulario
const formularioVacio = { nombre: '', correo: '', mensaje: '' }

// Formato simple de correo: algo@algo.algo
const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Revisa los campos y devuelve los errores encontrados
function validar(formulario) {
  const errores = {}
  const correo = formulario.correo.trim()
  if (formulario.nombre.trim() === '') errores.nombre = 'Ingresa tu nombre.'
  if (correo === '') {
    errores.correo = 'Ingresa tu correo.'
  } else if (!formatoCorreo.test(correo)) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }
  if (formulario.mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  }
  return errores
}

function Contactanos() {
  // El mensaje no se guarda: al enviar solo se limpian los campos
  const {
    valores: formulario,
    errores,
    exito: enviado,
    manejarCambio,
    manejarEnvio,
  } = useFormulario({
    valoresIniciales: formularioVacio,
    validar,
    alEnviar: () => {},
  })

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
          <form className="formulario" noValidate onSubmit={manejarEnvio}>
            <CampoFormulario
              etiqueta="Nombre"
              id="nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              error={errores.nombre}
            />

            <CampoFormulario
              etiqueta="Correo"
              id="correo"
              name="correo"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              error={errores.correo}
            />

            <CampoFormulario
              etiqueta="Mensaje"
              id="mensaje"
              name="mensaje"
              tipo="textarea"
              rows="4"
              value={formulario.mensaje}
              onChange={manejarCambio}
              error={errores.mensaje}
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
