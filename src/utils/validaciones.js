import { categorias } from '../data/categorias'

// Límites de los campos numéricos
export const STOCK_MAXIMO = 100000
export const PRECIO_MAXIMO = 10000000

// Letras con tildes, diéresis y ñ (mayúsculas y minúsculas) y números
const LETRAS = 'A-Za-zÁÉÍÓÚÜÑáéíóúüñ'
const LETRAS_Y_NUMEROS = `${LETRAS}0-9`

// Escapa los caracteres especiales para usar un texto dentro de una regex
function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Una expresión regular y un mensaje por campo
// (?=.*[...]) obliga a que haya al menos una letra o número, no solo signos
export const reglas = {
  nombre: {
    regex: new RegExp(`^(?=.*[${LETRAS_Y_NUMEROS}])[${LETRAS_Y_NUMEROS} .,()/-]{2,60}$`),
    vacio: 'Ingresa el nombre del artículo.',
    mensaje: 'El nombre debe tener entre 2 y 60 caracteres: letras, números, espacios y . , ( ) - /',
  },
  marca: {
    regex: new RegExp(`^(?=.*[${LETRAS_Y_NUMEROS}])[${LETRAS_Y_NUMEROS} .&-]{2,40}$`),
    vacio: 'Ingresa la marca del artículo.',
    mensaje: 'La marca debe tener entre 2 y 40 caracteres: letras, números, espacios y . & -',
  },
  tipo: {
    // Se arma con los nombres de data/categorias.js
    regex: new RegExp(`^(${categorias.map((cat) => escaparRegex(cat.nombre)).join('|')})$`),
    vacio: 'Selecciona un tipo de producto.',
    mensaje: 'Selecciona un tipo de producto de la lista.',
  },
  stock: {
    regex: /^\d+$/,
    vacio: 'Ingresa el stock.',
    mensaje: `El stock debe ser un número entero entre 0 y ${STOCK_MAXIMO.toLocaleString('es-CL')}.`,
  },
  precio: {
    // Pesos chilenos enteros: 1990 o con puntos de miles bien puestos (1.990, 1.250.000)
    regex: /^(\d+|\d{1,3}(\.\d{3})+)$/,
    vacio: 'Ingresa el precio.',
    mensaje: `Ingresa el precio en pesos chilenos, sin decimales, mayor a 0 y hasta ${PRECIO_MAXIMO.toLocaleString('es-CL')} (ejemplos: 1990 o 1.990).`,
  },
}

// Quita los puntos de miles y devuelve el precio como número entero ("1.250.000" -> 1250000)
export function normalizarPrecio(texto) {
  return Number(texto.trim().replaceAll('.', ''))
}

// Comprobaciones numéricas extra, además de la regex
const extras = {
  stock: (texto) => {
    const numero = Number(texto)
    return Number.isInteger(numero) && numero >= 0 && numero <= STOCK_MAXIMO
  },
  precio: (texto) => {
    // El máximo se revisa sobre el número, no sobre el texto
    const numero = normalizarPrecio(texto)
    return Number.isInteger(numero) && numero > 0 && numero <= PRECIO_MAXIMO
  },
}

// Valida un campo y devuelve el mensaje de error, o '' si está bien
export function validarCampo(campo, valor) {
  const regla = reglas[campo]
  const texto = valor.trim()

  if (texto === '') return regla.vacio
  if (!regla.regex.test(texto)) return regla.mensaje
  if (extras[campo] && !extras[campo](texto)) return regla.mensaje
  return ''
}

// Valida los cinco campos del artículo y devuelve solo los que tienen error
export function validarArticulo(valores) {
  const errores = {}
  for (const campo of Object.keys(reglas)) {
    const error = validarCampo(campo, valores[campo])
    if (error) errores[campo] = error
  }
  return errores
}
