// Devuelve un arreglo nuevo con los artículos de la categoría elegida
// Con 'Todas' se devuelven todos; el arreglo original no se modifica
export function filtrarPorCategoria(articulos, categoria) {
  if (categoria === 'Todas') return articulos.filter(() => true)
  return articulos.filter((articulo) => articulo.tipo === categoria)
}
