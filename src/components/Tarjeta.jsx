// Contenedor blanco con esquinas redondeadas y sombra
// "como" elige la etiqueta (div, article, section...) y className agrega clases extra
function Tarjeta({ como: Etiqueta = 'div', className = '', children }) {
  return (
    <Etiqueta
      className={`rounded-[var(--radio)] bg-[var(--blanco)] shadow-[var(--sombra)] ${className}`}
    >
      {children}
    </Etiqueta>
  )
}

export default Tarjeta
