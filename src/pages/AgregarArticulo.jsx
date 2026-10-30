import { useEffect, useState } from 'react'
import CampoFormulario from '../components/CampoFormulario.jsx'
import { categorias } from '../data/categorias'
import { ACTIONS } from '../context/articulos'
import { useArticulos } from '../context/useArticulos'

// Valores vacíos del formulario
const formularioVacio = { nombre: '', marca: '', tipo: '' }

// Revisa los campos y devuelve los errores encontrados
function validar(formulario) {
  const errores = {}
  if (formulario.nombre.trim() === '') errores.nombre = 'Ingresa el nombre del artículo.'
  if (formulario.marca.trim() === '') errores.marca = 'Ingresa la marca del artículo.'
  if (formulario.tipo === '') errores.tipo = 'Selecciona un tipo de producto.'
  return errores
}

// Página con el formulario para agregar artículos
function AgregarArticulo() {
  const { dispatch } = useArticulos()
  // Un solo estado con todos los campos
  const [formulario, setFormulario] = useState(formularioVacio)
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(false)

  // El mensaje de éxito se oculta solo a los 3 segundos
  useEffect(() => {
    if (!exito) return
    const timer = setTimeout(() => setExito(false), 3000)
    // Se limpia el timer si el componente se desmonta
    return () => clearTimeout(timer)
  }, [exito])

  // Un solo manejador, usa el name del campo
  function manejarCambio(e) {
    const { name, value } = e.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(e) {
    e.preventDefault()
    const nuevosErrores = validar(formulario)
    setErrores(nuevosErrores)

    // Si hay errores no se agrega nada
    if (Object.keys(nuevosErrores).length > 0) {
      setExito(false)
      return
    }

    dispatch({
      type: ACTIONS.AGREGAR_ARTICULO,
      payload: {
        nombre: formulario.nombre.trim(),
        marca: formulario.marca.trim(),
        tipo: formulario.tipo,
      },
    })
    setFormulario(formularioVacio)
    setExito(true)
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-8">
      <h1 className="mb-6 text-3xl font-bold">Agregar artículo</h1>

      <form
        noValidate
        onSubmit={manejarEnvio}
        className="max-w-xl rounded-[var(--radio)] bg-[var(--blanco)] p-6 shadow-[var(--sombra)]"
      >
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
          etiqueta="Marca"
          id="marca"
          name="marca"
          type="text"
          value={formulario.marca}
          onChange={manejarCambio}
          error={errores.marca}
        />

        <CampoFormulario
          etiqueta="Tipo de producto"
          id="tipo"
          name="tipo"
          tipo="select"
          value={formulario.tipo}
          onChange={manejarCambio}
          error={errores.tipo}
        >
          <option value="">Selecciona un tipo</option>
          {categorias.map((cat) => (
            <option key={cat.nombre} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </CampoFormulario>

        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-full border-0 bg-[var(--lima)] px-7 py-3 [font-family:inherit] text-base font-semibold text-[var(--verde-oscuro)] transition-colors hover:bg-[var(--lima-oscuro)] sm:w-auto"
        >
          Agregar artículo
        </button>

        {/* Aviso cuando se agrega bien */}
        {exito && (
          <p
            role="status"
            className="mt-4 rounded-xl bg-[#e6f4d7] px-4 py-3 font-semibold text-[var(--verde-oscuro)]"
          >
            ✅ Artículo agregado correctamente
          </p>
        )}
      </form>
    </div>
  )
}

export default AgregarArticulo
