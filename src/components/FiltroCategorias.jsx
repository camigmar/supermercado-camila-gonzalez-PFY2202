// Botones para filtrar por categoría, más uno "Todas"
// categorias: arreglo de { nombre }, seleccionada: nombre actual, alCambiar(nombre)
function FiltroCategorias({ categorias, seleccionada, alCambiar }) {
  const opciones = ['Todas', ...categorias.map((cat) => cat.nombre)]

  return (
    <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {opciones.map((nombre) => {
        const activa = nombre === seleccionada
        return (
          <button
            key={nombre}
            type="button"
            aria-pressed={activa}
            onClick={() => alCambiar(nombre)}
            className={`cursor-pointer rounded-full border border-[var(--verde-oscuro)] px-4 py-2 text-sm [font-family:inherit] transition-colors ${
              activa
                ? 'border-[var(--lima)] bg-[var(--lima)] font-bold text-[var(--verde-oscuro)]'
                : 'bg-[var(--blanco)] font-medium text-[var(--verde-oscuro)] hover:bg-[var(--verde-medio)] hover:text-[var(--blanco)]'
            }`}
          >
            {nombre}
          </button>
        )
      })}
    </div>
  )
}

export default FiltroCategorias
