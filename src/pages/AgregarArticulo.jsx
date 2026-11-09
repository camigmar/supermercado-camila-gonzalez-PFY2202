import CampoFormulario from '../components/CampoFormulario.jsx'
import Boton from '../components/Boton.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import { categorias } from '../data/categorias'
import { ACTIONS } from '../context/articulos'
import { useArticulos } from '../context/useArticulos'
import { useFormulario } from '../hooks/useFormulario'
import { validarArticulo, normalizarPrecio } from '../utils/validaciones'

// Valores vacíos del formulario
const formularioVacio = { nombre: '', marca: '', tipo: '', stock: '', precio: '' }

// Página con el formulario para agregar artículos
function AgregarArticulo() {
  const { dispatch } = useArticulos()

  // Lo que se hace cuando el formulario es válido
  function agregar(valores) {
    dispatch({
      type: ACTIONS.AGREGAR_ARTICULO,
      payload: {
        id: crypto.randomUUID(),
        nombre: valores.nombre.trim(),
        marca: valores.marca.trim(),
        tipo: valores.tipo,
        stock: Number(valores.stock.trim()),
        // Entero sin puntos de miles
        precio: normalizarPrecio(valores.precio),
      },
    })
  }

  const {
    valores: formulario,
    errores,
    exito,
    manejarCambio,
    manejarEnvio,
  } = useFormulario({
    valoresIniciales: formularioVacio,
    validar: validarArticulo,
    alEnviar: agregar,
  })

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
            type="text"
            inputMode="numeric"
            value={formulario.stock}
            onChange={manejarCambio}
            error={errores.stock}
          />

          <CampoFormulario
            etiqueta="Precio"
            id="precio"
            name="precio"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 1990 o 1.990"
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
