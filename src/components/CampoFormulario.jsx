// Campo de formulario con label, control y mensaje de error
// "tipo" puede ser input, select o textarea
function CampoFormulario({ etiqueta, id, tipo = 'input', error, children, ...props }) {
  // El borde se pone rojo si hay error
  const clasesControl = `w-full rounded-xl border bg-[var(--blanco)] px-3.5 py-2.5 [font-family:inherit] text-base text-[var(--texto)] outline-none focus:ring-2 focus:ring-[var(--lima)] ${
    error ? 'border-[var(--rojo)]' : 'border-[#ddd] focus:border-[var(--verde-medio)]'
  }`

  // Props que comparten los tres controles
  const propsControl = {
    id,
    className: clasesControl,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    ...props,
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-[var(--verde-oscuro)]">
        {etiqueta}
      </label>

      {tipo === 'select' && <select {...propsControl}>{children}</select>}
      {tipo === 'textarea' && <textarea {...propsControl} />}
      {tipo === 'input' && <input {...propsControl} />}

      {/* Mensaje de error debajo del campo */}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-[var(--rojo)]">
          {error}
        </p>
      )}
    </div>
  )
}

export default CampoFormulario
