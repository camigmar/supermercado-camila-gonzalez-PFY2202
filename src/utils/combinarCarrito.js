// Junta cada ítem del carrito con los datos de su artículo
// Devuelve [{ ...articulo, cantidad }] e ignora ids que ya no existen
export function combinarCarrito(carrito, articulos) {
  return carrito
    .map((item) => {
      const articulo = articulos.find((a) => a.id === item.id)
      return articulo ? { ...articulo, cantidad: item.cantidad } : null
    })
    .filter((item) => item !== null)
}
