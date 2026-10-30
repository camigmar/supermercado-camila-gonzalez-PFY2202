import { useArticulos } from '../context/useArticulos'

// Página con la tabla de todos los artículos
function ListaArticulos() {
  const { articulos } = useArticulos()

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-12 pb-8">
      <h1 className="mb-6 text-3xl font-bold">Inventario de artículos</h1>

      {/* Si no hay artículos se muestra un mensaje */}
      {articulos.length === 0 ? (
        <p className="text-[var(--texto-suave)]">No hay artículos registrados.</p>
      ) : (
        // overflow-x-auto para que la tabla se pueda mover en celular
        <div className="overflow-x-auto rounded-[var(--radio)] bg-[var(--blanco)] shadow-[var(--sombra)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eee] text-sm text-[var(--texto-suave)]">
                <th className="px-5 py-3 font-semibold">Nombre</th>
                <th className="px-5 py-3 font-semibold">Marca</th>
                <th className="px-5 py-3 font-semibold">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {articulos.map((articulo) => (
                <tr key={articulo.id} className="border-b border-[#eee] last:border-b-0">
                  <td className="px-5 py-3 font-semibold whitespace-nowrap text-[var(--verde-oscuro)]">
                    {articulo.nombre}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">{articulo.marca}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-[var(--texto-suave)]">
                    {articulo.tipo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListaArticulos
