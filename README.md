# Super Fresco 🌿

Sitio web de **Super Fresco**, un supermercado de barrio ficticio. Lo hice para el ramo **Desarrollo Frontend II (PFY2202)** de Duoc UC.

En el sitio se pueden ver los productos, filtrarlos por categoría, ver el detalle de cada uno, agregarlos al carro con la cantidad que se quiera y revisar el carrito. También tiene un formulario para agregar artículos nuevos al inventario y las páginas de Quiénes somos y Contáctanos.

- **Sitio publicado:** https://camigmar.github.io/supermercado-camila-gonzalez-PFY2202/
- **Repositorio:** https://github.com/camigmar/supermercado-camila-gonzalez-PFY2202

Los datos son de ejemplo y viven en memoria: al recargar la página el inventario y el carrito vuelven a como estaban al principio.

## Tecnologías

| Tecnología | Para qué la uso |
|---|---|
| React | Componentes y estado de la interfaz |
| Vite | Servidor de desarrollo y build |
| React Router | Rutas de las páginas (`BrowserRouter`, `Routes`, `NavLink`, `useParams`) |
| Tailwind CSS | Todos los estilos de componentes y páginas |
| Context + useReducer | Estado global con el inventario y el carrito |
| gh-pages | Publicar la carpeta `dist` en la rama `gh-pages` (GitHub Pages) |

## Cómo correrlo

Necesitas tener Node.js instalado (yo uso la versión 22). En la carpeta del proyecto:

```bash
npm install       # instala las dependencias
npm run dev       # servidor de desarrollo
npm run build     # genera la carpeta dist (y dist/404.html)
npm run preview   # sirve la carpeta dist para revisarla antes de publicar
npm run lint      # revisa el código con oxlint
```

El sitio usa la ruta base `/supermercado-camila-gonzalez-PFY2202/` (está en `vite.config.js`), así que también en desarrollo la dirección la incluye. Con `npm run dev` normalmente es:

```
http://localhost:5173/supermercado-camila-gonzalez-PFY2202/
```

### Publicar en GitHub Pages

1. Primero subo los cambios a `main` (`git push`).
2. Después ejecuto:

```bash
npm run deploy
```

`predeploy` hace el build y `deploy` sube la carpeta `dist` a la rama `gh-pages` con el mensaje "Publico el sitio". GitHub Pages publica esa rama (carpeta raíz).

El build copia `index.html` como `404.html` con el script `scripts/copiar-404.js`. Así, si alguien recarga en una ruta interna como `/productos`, GitHub Pages entrega ese `404.html`, la app carga igual y React Router muestra la página correcta.

## Páginas y rutas

Todas las rutas están en `src/App.jsx` y comparten el `Layout` (menú superior, footer y menú inferior).

| Ruta | Página | Qué hace |
|---|---|---|
| `/` | `Home` | Presentación con el botón **Ir a comprar** (lleva a Productos) y las categorías con cuántos productos tiene cada una. |
| `/productos` | `ListaArticulos` | Tabla de productos con filtro por categoría y una columna para **agregar al carro** eligiendo la cantidad. El nombre de cada producto lleva a su detalle. |
| `/productos/:id` | `DetalleArticulo` | Datos del producto (tipo, nombre, marca, precio y stock), selector de cantidad para agregar al carro y aviso de cuántas unidades ya hay en el carrito. Si el id no existe muestra "Artículo no encontrado". |
| `/carrito` | `Carrito` | Productos del carrito con botones − y +, subtotal, botón Quitar y total. Si está vacío muestra un mensaje y un botón para ver productos. |
| `/agregar-articulo` | `AgregarArticulo` | Formulario con validaciones para agregar un artículo nuevo al inventario. |
| `/quienes-somos` | `QuienesSomos` | Qué es Super Fresco, misión, visión y valores. |
| `/contactanos` | `Contactanos` | Datos de contacto y formulario con validación (el mensaje no se guarda). |
| cualquier otra | `NotFound` | "Página no encontrada" con un botón para volver al inicio. |

Arriba hay un menú con **Productos**, **Carrito** (con una insignia que muestra las unidades del carrito) y **Agregar artículo**. Abajo hay un menú fijo con **Inicio**, **Quiénes somos** y **Contáctanos**.

## Cómo funciona la compra

1. **Filtro por categoría** (Productos): los botones "Todas", "Frutas y verduras", "Lácteos", "Abarrotes" y "Bebidas" cambian la categoría elegida. La lista que se muestra se calcula en cada render con `filtrarPorCategoria`, que usa `.filter()` y devuelve un arreglo nuevo, así que no cambia los datos originales ni el estado global. Arriba de la tabla aparece "Mostrando X de Y artículos".
2. **Detalle**: al hacer clic en el nombre se abre `/productos/:id` con toda la información del producto.
3. **Agregar al carro con cantidad**: el componente `AgregarAlCarro` tiene − y + para elegir la cantidad (mínimo 1 y máximo el stock actual) y el botón **Agregar al carro**. Al agregar, esas unidades se restan del stock y se suman al carrito. Si se piden más unidades que el stock, solo se agregan las que hay. Con stock 0 todo queda deshabilitado y el botón dice "Sin stock".
4. **Carrito**: el botón **+** pasa una unidad más del stock al carrito (se deshabilita si ya no queda stock), el botón **−** devuelve una unidad al stock (si llega a 0 el producto sale del carrito) y **Quitar** devuelve al stock toda la cantidad de ese producto. El total se recalcula solo.

Como el stock y el carrito están en el mismo estado, cada acción mueve unidades de un lado al otro. Así el stock nunca queda negativo y la cantidad del carrito nunca supera el stock original.

## Estado global

Está en `src/context/`. `ArticulosProvider` (en `ArticulosContext.jsx`) envuelve la app en `main.jsx` y usa `useReducer` con el reducer de `articulosReducer.js`. Las páginas lo leen con el hook `useArticulos()`, que entrega `articulos`, `carrito` y `dispatch`.

El estado es un solo objeto:

```js
{
  articulos: [{ id, nombre, marca, tipo, stock, precio }, ...],
  carrito: [{ id, cantidad }, ...],
}
```

Puse el inventario y el carrito en el mismo reducer porque cada acción del carrito también cambia el stock. Si estuvieran separados habría que actualizar dos estados a la vez y podrían quedar descuadrados.

### Acciones del reducer

Las acciones están en `ACTIONS` (`src/context/articulos.js`). Ninguna modifica el estado anterior: siempre devuelven un objeto nuevo.

| Acción | Payload | Qué hace |
|---|---|---|
| `AGREGAR_ARTICULO` | artículo completo con `id` | Agrega el artículo al final del inventario. |
| `AGREGAR_AL_CARRITO` | `{ id, cantidad }` | Pasa `cantidad` unidades del stock al carrito, como máximo el stock disponible. Si el stock es 0 o la cantidad es menor que 1, no cambia nada. |
| `AUMENTAR_CANTIDAD` | `id` | Pasa una unidad del stock al carrito, solo si queda stock. |
| `DISMINUIR_CANTIDAD` | `id` | Devuelve una unidad al stock. Si la cantidad llega a 0, quita el producto del carrito. |
| `QUITAR_DEL_CARRITO` | `id` | Devuelve al stock toda la cantidad y quita el producto del carrito. |

**Por qué el carrito guarda solo `id` y `cantidad`:** el nombre, la marca y el precio ya están en `articulos`. Si los copiara en el carrito tendría los mismos datos en dos lugares. Para mostrar el carrito, `combinarCarrito` junta cada ítem con su artículo en el momento.

**Por qué el id se genera fuera del reducer:** el formulario de Agregar artículo crea el id con `crypto.randomUUID()` y lo manda en el payload. Así el reducer es una función pura (con el mismo estado y la misma acción siempre da el mismo resultado). Todos los ids son strings, también los de los artículos iniciales (`'1'`, `'2'`, ...).

### Estado local

Lo que solo le importa a un componente se queda como estado local:

| Estado | Dónde | Por qué es local |
|---|---|---|
| Categoría seleccionada del filtro | `ListaArticulos` (`useState`) | Solo cambia lo que se ve en esa página. La lista filtrada no se guarda: se calcula con `.filter()`. |
| Cantidad elegida al agregar | `AgregarAlCarro` (`useState`) | Es propia de cada fila o del detalle y vuelve a 1 después de agregar. Se ajusta al stock al renderizar con `Math.min`. |
| Aviso "Agregaste N al carro" | `AgregarAlCarro` (`useState` + `useEffect`) | Es un mensaje temporal que se borra a los 2,5 segundos. El temporizador se limpia al desmontar. |
| Valores, errores y mensaje de éxito de los formularios | `useFormulario` (`useState` + `useRef`) | Mientras se escribe no hace falta compartirlos. Solo al enviar un artículo válido se hace `dispatch`. |

## Estructura de carpetas

```
├── public/            favicon.svg
├── scripts/           copiar-404.js (copia dist/index.html a dist/404.html)
├── src/
│   ├── components/    componentes reutilizables
│   ├── context/       estado global: contexto, acciones, reducer y hook
│   ├── data/          datos de ejemplo (artículos, categorías, contacto, valores)
│   ├── hooks/         useFormulario
│   ├── layouts/       Layout con los menús y el footer
│   ├── pages/         una página por ruta
│   ├── styles/        global.css y tailwind.css
│   ├── utils/         funciones de ayuda
│   ├── App.jsx        rutas
│   └── main.jsx       punto de entrada (BrowserRouter con la ruta base y ArticulosProvider)
├── index.html
├── vite.config.js
└── package.json
```

### Componentes (`src/components/`)

| Componente | Responsabilidad |
|---|---|
| `InventoryTable` | Tabla configurable. Recibe `articulos`, `columnas` (`{ titulo, render, alineacion }`) y `mensajeVacio`. La uso en Productos y en Carrito, cada página con sus propias columnas. Se desplaza hacia el lado en celular. |
| `ProductRow` | Una fila de `InventoryTable`: una celda por columna usando `columna.render(articulo)`. |
| `Boton` | Botón o enlace (si recibe `to`). Tiene `variante` (`primario` o `contorno`) y `tamano` (`normal`, `grande` o `chico`), con estilo de deshabilitado. |
| `Tarjeta` | Contenedor blanco con borde redondeado y sombra. Con `como` se elige la etiqueta (`div`, `article`, `section`). |
| `Contenedor` | Limita el ancho del contenido a 1100px y deja margen a los lados. |
| `Seccion` | Sección con su título centrado. |
| `Etiqueta` | Pastilla lima con un texto corto ("Conócenos", "Gestión de inventario"). |
| `IconoCirculo` | Círculo con un emoji al centro; el color de fondo se pasa por `className`. |
| `FiltroCategorias` | Botones de categorías más "Todas", con `aria-pressed` en cada uno. |
| `AgregarAlCarro` | Selector de cantidad y botón para agregar al carro. Se usa en Productos y en el detalle. |
| `CampoFormulario` | Label, control (`input`, `select` o `textarea`) y mensaje de error con `aria-invalid` y `aria-describedby`. |
| `Hero`, `CategoryCard` | Partes de la página de inicio. |
| `MenuSuperior`, `MenuInferior`, `Footer` | Navegación y pie de página que usa el `Layout`. |

### Hook (`src/hooks/`)

- `useFormulario({ valoresIniciales, validar, alEnviar })`: maneja los valores, los errores y el mensaje de éxito de un formulario. Entrega `manejarCambio`, `manejarEnvio` y `reiniciar`. El mensaje de éxito se oculta a los 3 segundos y el temporizador se cancela si se vuelve a enviar o si la página se desmonta. Lo usan Agregar artículo y Contáctanos.

### Utilidades (`src/utils/`)

| Archivo | Qué hace |
|---|---|
| `filtrarPorCategoria.js` | Devuelve los artículos de una categoría (o todos con "Todas") sin modificar el arreglo original. |
| `combinarCarrito.js` | Junta cada ítem del carrito con los datos de su artículo y descarta ids que no existen. |
| `calcularTotal.js` | Suma `precio * cantidad` de los ítems del carrito. |
| `contarProductos.js` | Cuenta cuántos productos hay de una categoría (para las tarjetas de inicio). |
| `formatearPrecio.js` | Muestra pesos chilenos sin decimales: `$1.990`. |
| `formatearNumero.js` | Pone el punto de miles al stock y las cantidades: `1.500`. |
| `claseAlineacion.js` | Convierte `'izquierda'` o `'derecha'` en la clase de Tailwind de la columna. |
| `validaciones.js` | Reglas del formulario de artículos (ver más abajo). |

## Convención de estilos

- **Tailwind** para todo el estilo de componentes y páginas, con clases escritas en el JSX. Para usar los colores del sitio uso las variables, por ejemplo `bg-[var(--lima)]`.
- **`src/styles/global.css`** solo tiene las variables (`:root`) y los estilos base (`box-sizing`, `body`, `h1`–`h3`, `p`), dentro de la capa `base` para que las clases de Tailwind les ganen.
- **`src/styles/tailwind.css`** importa solo el tema y las utilidades de Tailwind (sin preflight), para que no cambie los estilos base.
- No hay archivos `.css` por componente ni por página.
- Las clases que dependen de datos se escriben completas (por ejemplo `bg-[#e6f4d7]` en `data/categorias.js`) para que Tailwind las detecte.

Variables de `global.css`:

| Variable | Valor | Para qué |
|---|---|---|
| `--crema` | `#fdf4ec` | Fondo de la página |
| `--verde-oscuro` | `#1f4d2b` | Títulos, menús y footer |
| `--verde-medio` | `#2f6b3c` | Hover de enlaces y botones |
| `--lima` | `#b8e65a` | Botón principal y opción activa del menú |
| `--lima-oscuro` | `#a2d33f` | Hover del botón principal |
| `--blanco` | `#ffffff` | Tarjetas y texto sobre fondo oscuro |
| `--texto` | `#2b2b2b` | Texto normal |
| `--texto-suave` | `#6b6b6b` | Textos secundarios |
| `--rojo` / `--rojo-suave` | `#b3261e` / `#fde3df` | Errores y aviso de stock bajo |
| `--radio` | `16px` | Bordes redondeados de las tarjetas |
| `--sombra` | `0 4px 16px rgba(31, 77, 43, 0.08)` | Sombra de las tarjetas |
| `--espacio-menu` | `96px` | Espacio abajo para que el menú fijo no tape el footer |
| `--fuente` | `system-ui, ...` | Tipografía del sitio |

Los colores van en variables para cambiarlos en un solo lugar y que todo el sitio use los mismos.

## Validaciones del formulario de artículos

Están en `src/utils/validaciones.js`. Cada campo tiene una expresión regular y un mensaje de error. Antes de validar se quitan los espacios del principio y del final (`trim()`). Los errores aparecen debajo de cada campo después de presionar "Agregar artículo".

| Campo | Regla |
|---|---|
| Nombre | 2 a 60 caracteres: letras (con tildes y ñ), números, espacios y `. , ( ) - /`. Debe tener al menos una letra o número. |
| Marca | 2 a 40 caracteres: letras (con tildes y ñ), números, espacios y `. & -`. Debe tener al menos una letra o número. |
| Tipo | Debe ser una de las categorías de `data/categorias.js` (la regla se arma con esa lista). |
| Stock | Solo dígitos, número entero entre 0 y 100.000. |
| Precio | Pesos chilenos sin decimales, mayor a 0 y hasta 10.000.000. Se puede escribir sin puntos (`1990`) o con puntos de miles bien puestos (`1.990`, `1.250.000`). No se aceptan comas, decimales ni signos como `$`. |

Al guardar, `normalizarPrecio` quita los puntos de miles y deja el precio como número entero.

### Matriz de casos de prueba

Estos resultados salen de ejecutar las funciones reales de `validaciones.js` (`validarCampo` y `normalizarPrecio`).

#### nombre

| Campo | Valor | Esperado | Resultado |
|---|---|---|---|
| nombre | `Manzana roja (kg)` | Válido | Válido |
| nombre | `Leche entera 1 L` | Válido | Válido |
| nombre | `Pan de molde 1/2 kg` | Válido | Válido |
| nombre | `Ñoquis, pasta seca` | Válido | Válido |
| nombre | (vacío) | Inválido | Inválido |
| nombre | (solo espacios) | Inválido | Inválido |
| nombre | `Arroz <script>` | Inválido | Inválido |
| nombre | `Café #1` | Inválido | Inválido |
| nombre | `A` | Inválido | Inválido |
| nombre | 61 caracteres | Inválido | Inválido |
| nombre | `...` | Inválido | Inválido |

#### marca

| Campo | Valor | Esperado | Resultado |
|---|---|---|---|
| marca | `Colún` | Válido | Válido |
| marca | `Procter & Gamble` | Válido | Válido |
| marca | `Coca-Cola` | Válido | Válido |
| marca | `Sr. Pérez` | Válido | Válido |
| marca | (vacío) | Inválido | Inválido |
| marca | (solo espacios) | Inválido | Inválido |
| marca | `Marca@123` | Inválido | Inválido |
| marca | `Marca (X)` | Inválido | Inválido |
| marca | `B` | Inválido | Inválido |
| marca | 41 caracteres | Inválido | Inválido |

#### tipo

| Campo | Valor | Esperado | Resultado |
|---|---|---|---|
| tipo | `Frutas y verduras` | Válido | Válido |
| tipo | `Lácteos` | Válido | Válido |
| tipo | `Abarrotes` | Válido | Válido |
| tipo | `Bebidas` | Válido | Válido |
| tipo | (vacío) | Inválido | Inválido |
| tipo | (solo espacios) | Inválido | Inválido |
| tipo | `Lacteos` | Inválido | Inválido |
| tipo | `Carnes` | Inválido | Inválido |
| tipo | `Bebidas\|Lácteos` | Inválido | Inválido |

#### stock

| Campo | Valor | Esperado | Resultado |
|---|---|---|---|
| stock | `0` | Válido | Válido |
| stock | `42` | Válido | Válido |
| stock | `100000` | Válido | Válido |
| stock | ` 15 ` | Válido | Válido |
| stock | (vacío) | Inválido | Inválido |
| stock | (solo espacios) | Inválido | Inválido |
| stock | `-5` | Inválido | Inválido |
| stock | `3.5` | Inválido | Inválido |
| stock | `12a` | Inválido | Inválido |
| stock | `100001` | Inválido | Inválido |

#### precio

| Campo | Valor | Esperado | Resultado |
|---|---|---|---|
| precio | `990` | Válido | Válido |
| precio | `1990` | Válido | Válido |
| precio | `1.990` | Válido | Válido |
| precio | `12.500` | Válido | Válido |
| precio | `1.250.000` | Válido | Válido |
| precio | `10.000.000` | Válido | Válido |
| precio | (vacío) | Inválido | Inválido |
| precio | (solo espacios) | Inválido | Inválido |
| precio | `0` | Inválido | Inválido |
| precio | `0.000` | Inválido | Inválido |
| precio | `-1990` | Inválido | Inválido |
| precio | `12,50` | Inválido | Inválido |
| precio | `1290.5` | Inválido | Inválido |
| precio | `1.99` | Inválido | Inválido |
| precio | `1.9900` | Inválido | Inválido |
| precio | `.990` | Inválido | Inválido |
| precio | `1..990` | Inválido | Inválido |
| precio | `1.00` | Inválido | Inválido |
| precio | `$1990` | Inválido | Inválido |
| precio | `mil` | Inválido | Inválido |
| precio | `10.000.001` | Inválido | Inválido |

#### normalizarPrecio

| Campo | Valor | Esperado | Resultado |
|---|---|---|---|
| normalizarPrecio | `1990` | 1990 | 1990 |
| normalizarPrecio | `1.990` | 1990 | 1990 |
| normalizarPrecio | `12.500` | 12500 | 12500 |
| normalizarPrecio | `1.250.000` | 1250000 | 1250000 |

## Recorridos y criterios visuales para revisar

### Recorrido de navegación

| Paso | Qué hacer | Resultado esperado |
|---|---|---|
| 1 | Entrar al sitio | Se ve Inicio con el botón "Ir a comprar" y las 4 categorías. |
| 2 | Presionar "Ir a comprar" | Se abre Productos con 6 productos y "Mostrando 6 de 6 artículos". |
| 3 | Presionar "Lácteos" | Quedan 2 productos y dice "Mostrando 2 de 6 artículos". |
| 4 | Presionar "Todas" y hacer clic en "Lechuga" | Se abre el detalle con stock 6 un. |
| 5 | Subir la cantidad a 3 y presionar "Agregar al carro" | El stock baja a 3 un., aparece "Agregaste 3 al carro" y la insignia del menú muestra 3. |
| 6 | Presionar "Ir al carrito" | Lechuga con cantidad 3, subtotal y total $2.970. |
| 7 | Presionar + y luego − dos veces | La cantidad pasa a 4 ($3.960) y después a 2 ($1.980). |
| 8 | Presionar "Quitar" | Aparece "Tu carrito está vacío." y la insignia vuelve a 0. |
| 9 | Recargar el navegador en `/productos` | La página carga normal (no queda en blanco ni da error). |
| 10 | Entrar a una ruta que no existe | Se ve "Página no encontrada" con el botón para volver al inicio. |
| 11 | Entrar a `/productos/999` | Se ve "Artículo no encontrado" con un enlace para volver a productos. |
| 12 | En Agregar artículo, enviar el formulario vacío | Aparece un error debajo de cada uno de los 5 campos. |

### Criterios visuales

- Se ve bien en 375 px (celular), 768 px (tablet) y 1280 px (computador).
- No hay desplazamiento horizontal de la página. Las tablas de Productos y Carrito sí se pueden desplazar hacia el lado dentro de su tarjeta en celular.
- El menú inferior queda fijo abajo y centrado, y no tapa el texto del footer al llegar al final de la página.
- Los emojis del cuadro verde de Inicio quedan en una sola fila y centrados.
- El foco se ve al navegar con el teclado (enlaces de la tabla y botones de cantidad).
- Los botones de agregar quedan deshabilitados (grises) cuando no hay stock, y el + del carrito se deshabilita cuando ya no queda stock.

## Autoría

Camila González — Desarrollo Frontend II (PFY2202), Duoc UC.
