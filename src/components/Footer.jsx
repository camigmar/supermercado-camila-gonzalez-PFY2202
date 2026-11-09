import Contenedor from './Contenedor.jsx'

// Pie de página que se ve en todas las páginas
// El margen y el padding de abajo usan --espacio-menu para que el fondo verde
// llegue hasta el borde inferior, detrás del menú fijo
function Footer() {
  return (
    <footer className="mt-8 -mb-[var(--espacio-menu)] bg-[var(--verde-oscuro)] pt-8 pb-[calc(32px+var(--espacio-menu))] text-center text-[#d6e4d9]">
      <Contenedor>
        <p className="mb-1 text-[1.2rem] font-bold text-[var(--blanco)]">🌿 Super Fresco</p>
        <p>Sistema de gestión de inventario</p>
        <p className="mt-3 text-[0.8rem] opacity-70">© 2026 Super Fresco</p>
      </Contenedor>
    </footer>
  )
}

export default Footer
