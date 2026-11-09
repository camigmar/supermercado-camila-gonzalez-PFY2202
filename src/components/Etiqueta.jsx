// Pastilla lima con un texto corto (por ejemplo "Conócenos")
// className sirve para el margen de abajo
function Etiqueta({ className = '', children }) {
  return (
    <span
      className={`inline-block rounded-full bg-[var(--lima)] px-3 py-1 text-[0.8rem] font-semibold text-[var(--verde-oscuro)] ${className}`}
    >
      {children}
    </span>
  )
}

export default Etiqueta
