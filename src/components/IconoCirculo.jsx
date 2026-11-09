// Círculo con un emoji al centro; className define el color de fondo
function IconoCirculo({ className = '', children }) {
  return (
    <div
      className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-[2rem] ${className}`}
    >
      {children}
    </div>
  )
}

export default IconoCirculo
