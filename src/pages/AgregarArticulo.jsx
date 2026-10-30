import { useEffect, useState } from 'react'
import CampoFormulario from '../components/CampoFormulario.jsx'
import Boton from '../components/Boton.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import { categorias } from '../data/categorias'
import { ACTIONS } from '../context/articulos'
import { useArticulos } from '../context/useArticulos'

// Valores vacíos del formulario
const formularioVacio = { nombre: '', marca: '', tipo: '', stock: '', precio: '' }

// Revisa los campos y devuelve los errores encontrados
function validar(formulario) {
  const errores = {}
  if (formulario.nombre.trim() === '') errores.nombre = 'Ingresa el nombre del artículo.'
  if (formulario.marca.trim() === '') errores.marca = 'Ingresa la marca del artículo.'
  if (formulario.tipo === '') errores.tipo = 'Selecciona un tipo de producto.'

  // Stock: número entero desde 0
  const stock = Number(formulario.stock)
  if (formulario.stock.trim() === '') {
    errores.stock = 'Ingresa el stock.'
  } else if (!Number.isInteger(stock) || stock < 0) {
    errores.stock = 'El stock debe ser un número entero igual o mayor a 0.'
  }

  // Precio: número entero mayor a 0
  const precio = Number(formulario.precio)
  if (formulario.precio.trim() === '') {
    errores.precio = 'Ingresa el precio.'
  } else if (!Number.isInteger(precio) || precio <= 0) {
    errores.precio = 'El precio debe ser un número entero mayor a 0.'
  }
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
        stock: Number(formulario.stock),
        precio: Number(formulario.precio),
      },
    })
    setFormulario(formularioVacio)
    setExito(true)
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-8">
      <h1 className="mb-6 text-3xl font-bold">Agregar artículo</h1>

      <Tarjeta className="max-w-xl p-6">
        <form noValidate onSubmit={manejarEnvio}>
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

          <CampoFormulario
            etiqueta="Stock"
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formulario.stock}
            onChange={manejarCambio}
            error={errores.stock}
          />

          <CampoFormulario
            etiqueta="Precio"
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="1"
            value={formulario.precio}
            onChange={manejarCambio}
            error={errores.precio}
          />

          <Boton type="submit" className="mt-2 w-full sm:w-auto">
            Agregar artículo
          </Boton>

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
      </Tarjeta>
    </div>
  )
}

export default AgregarArticulo
