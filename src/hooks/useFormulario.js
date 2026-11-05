import { useEffect, useRef, useState } from 'react'

// Hook para manejar un formulario: valores, errores, envío y mensaje de éxito
// - valoresIniciales: objeto con los campos vacíos
// - validar(valores): devuelve un objeto { campo: 'mensaje de error' }
// - alEnviar(valores): lo que hace cada página cuando el formulario es válido
export function useFormulario({ valoresIniciales, validar, alEnviar, duracionExito = 3000 }) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(false)
  // Guarda el temporizador del mensaje de éxito
  const temporizador = useRef(null)

  // Si el componente se desmonta se cancela el temporizador
  useEffect(() => () => clearTimeout(temporizador.current), [])

  // Un solo manejador para todos los campos, usa el name del campo
  function manejarCambio(e) {
    const { name, value } = e.target
    setValores((anteriores) => ({ ...anteriores, [name]: value }))
  }

  // Deja los campos y errores como al principio
  function reiniciar() {
    setValores(valoresIniciales)
    setErrores({})
  }

  // Al enviar no recarga la página, valida y llama a alEnviar si todo está bien
  function manejarEnvio(e) {
    e.preventDefault()
    // Si había un mensaje anterior, su temporizador se cancela
    clearTimeout(temporizador.current)

    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      setExito(false)
      return
    }

    alEnviar(valores)
    setValores(valoresIniciales)
    setExito(true)
    // El mensaje de éxito se oculta solo
    temporizador.current = setTimeout(() => setExito(false), duracionExito)
  }

  return { valores, errores, exito, manejarCambio, manejarEnvio, reiniciar }
}
