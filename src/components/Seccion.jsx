// Sección con su título centrado
function Seccion({ titulo, className = '', children }) {
  return (
    <section className={className}>
      <h2 className="mb-6 text-center text-[1.8rem]">{titulo}</h2>
      {children}
    </section>
  )
}

export default Seccion
