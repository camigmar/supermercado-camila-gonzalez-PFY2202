// Contenedor blanco con esquinas redondeadas y sombra
// className sirve para agregar clases extra
function Tarjeta({ className = '', children }) {
  return (
    <div
      className={`rounded-[var(--radio)] bg-[var(--blanco)] shadow-[var(--sombra)] ${className}`}
    >
      {children}
    </div>
  )
}

export default Tarjeta
