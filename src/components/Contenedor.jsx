// Limita el ancho del contenido y le da margen a los lados
// "como" elige la etiqueta y className agrega clases extra
function Contenedor({ como: Etiqueta = 'div', className = '', children }) {
  return (
    <Etiqueta className={`mx-auto w-full max-w-[1100px] px-4 ${className}`}>{children}</Etiqueta>
  )
}

export default Contenedor
