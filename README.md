# Super Fresco 🌿

Proyecto para el ramo PFY2202 de Duoc. Es un sitio web para un supermercado de barrio ficticio llamado **Super Fresco**, que sirve para ver y ordenar su inventario.

## Tecnologías

- React
- Vite
- React Router
- Tailwind CSS

## Cómo correrlo

Necesitas tener Node.js instalado. En la carpeta del proyecto:

```bash
npm install
npm run dev
```

Después abre en el navegador la dirección que aparece en la terminal (normalmente http://localhost:5173).

## Páginas

- **Inicio** (`/`): presentación, categorías y tabla del inventario.
- **Quiénes somos** (`/quienes-somos`): qué es Super Fresco, misión, visión y valores.
- **Contáctanos** (`/contactanos`): datos de contacto y formulario con validación.
- **Inventario de artículos** (`/articulos`): tabla con todos los artículos del estado global (nombre, marca, tipo, stock y precio).
- **Agregar artículo** (`/agregar-articulo`): formulario para agregar un artículo nuevo con stock y precio.
- **Página no encontrada**: se muestra si la dirección no existe.

Abajo hay un menú fijo para Inicio, Quiénes somos y Contáctanos, y arriba un menú para las dos páginas de artículos.

## Estado global

La lista de artículos (nombre, marca, tipo, stock y precio) se guarda en un estado global hecho con **Context** y **useReducer**:

- `ArticulosProvider` envuelve la app en `main.jsx` y parte con los artículos de `data/articulosIniciales.js`.
- El reducer tiene la acción `AGREGAR_ARTICULO`, que agrega el artículo al final de la lista con un id único.
- Las páginas usan el hook `useArticulos()` para leer `articulos` o usar `dispatch`.

Inicio y la página de artículos leen esta misma lista, así que cuando se agrega un artículo en el formulario aparece altiro en las dos. Los datos no se guardan, se pierden al recargar la página.

## Estructura de `src/`

```
src/
├── components/   componentes reutilizables (menús, footer, botón, tarjeta, campo de formulario, etc.)
├── context/      estado global de artículos (contexto, acciones, reducer y hook)
├── data/         datos de ejemplo (articulosIniciales, categorías, contacto, valores)
├── layouts/      Layout con los menús y el footer que comparten las páginas
├── pages/        una página por ruta
├── styles/       estilos generales y Tailwind
├── utils/        funciones de ayuda (formatear precio, contar productos)
├── App.jsx       rutas de la app
└── main.jsx      punto de entrada
```
