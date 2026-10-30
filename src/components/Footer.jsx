import './Footer.css'

// Pie de página que se ve en todas las páginas
function Footer() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <p className="pie-nombre">🌿 Super Fresco</p>
        <p>Sistema de gestión de inventario</p>
        <p className="pie-copy">© 2026 Super Fresco</p>
      </div>
    </footer>
  )
}

export default Footer
