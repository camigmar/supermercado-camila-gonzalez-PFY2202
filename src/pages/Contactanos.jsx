import { datosContacto } from '../data/contacto'
import CampoFormulario from '../components/CampoFormulario.jsx'
import Boton from '../components/Boton.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import Contenedor from '../components/Contenedor.jsx'
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
    <Contenedor className="pt-12 pb-8 md:pt-18">
      {/* Título de la página */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-[2.5rem] md:text-[3.5rem]">Contáctanos</h1>
        <p className="text-[var(--texto-suave)]">Escríbenos si tienes dudas o sugerencias.</p>
      </header>

      {/* En computador: datos a la izquierda y formulario a la derecha */}
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-start">
        {/* Tarjeta con los datos de contacto */}
        <Tarjeta como="section" className="p-6">
          <h2 className="mb-4 text-[1.3rem]">Datos de contacto</h2>
          <ul className="m-0 grid list-none gap-4 p-0">
            {datosContacto.map((dato) => (
              <li key={dato.titulo} className="flex items-center gap-3">
                {/* Círculo con el emoji */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--crema)] text-[1.3rem]">
                  {dato.emoji}
                </span>
                <div>
                  <strong className="text-[var(--verde-oscuro)]">{dato.titulo}</strong>
                  <p className="text-[0.95rem] text-[var(--texto-suave)]">{dato.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </Tarjeta>

        {/* Formulario */}
        <Tarjeta como="section" className="p-6">
          <h2 className="mb-4 text-[1.3rem]">Envíanos un mensaje</h2>
          <form className="flex flex-col" noValidate onSubmit={manejarEnvio}>
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

            <Boton type="submit" className="self-start">
              Enviar
            </Boton>
          </form>

          {/* Aviso cuando se envía */}
          {enviado && (
            <p className="mt-4 rounded-xl bg-[#e6f4d7] px-4 py-3 font-semibold text-[var(--verde-oscuro)]">
              ✅ Mensaje enviado
            </p>
          )}
        </Tarjeta>
      </div>
    </Contenedor>
  )
}

export default Contactanos
