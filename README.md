# NEFFY TECH — Evaluación Parcial DAW

Aplicación web académica para una tienda ficticia de productos tecnológicos. Incluye API REST con Node.js + Express y frontend responsive con HTML, CSS y JavaScript. El frontend obtiene los datos mediante `fetch()` desde endpoints HTTP; los productos, categorías, promociones y servicios no se escriben manualmente en las vistas.

## 1. Requisitos
- Node.js 18 o superior.
- Visual Studio Code (recomendado).
- Navegador actualizado.
- Cuenta de Render para publicar el servicio.

## 2. Ejecutar en local
1. Descomprime el ZIP y abre la carpeta `NEFFY_TECH_Evaluacion_DAW` en VS Code.
2. Abre la terminal dentro de la carpeta.
3. Ejecuta `npm install`.
4. Ejecuta `npm start`.
5. Abre `http://localhost:3000`.
6. Prueba `http://localhost:3000/api` y los endpoints descritos más abajo.

## 3. Recursos y endpoints
| Método | Endpoint | Función |
|---|---|---|
| GET | `/api` | Estado y recursos disponibles |
| GET | `/api/productos` | Catálogo principal |
| GET | `/api/productos/:id` | Detalle individual; responde 404 si no existe |
| GET | `/api/productos?buscar=mouse` | Búsqueda por nombre, marca o descripción |
| GET | `/api/productos?categoria=1` | Filtro por ID de categoría |
| GET | `/api/productos?minPrecio=50&maxPrecio=200` | Filtro por rango de precio |
| GET | `/api/productos?destacado=true` | Productos destacados |
| GET | `/api/categorias` | Categorías |
| GET | `/api/promociones` | Promociones activas |
| GET | `/api/servicios` | Servicios de la empresa |

Los datos de demostración se encuentran en `src/datos.js`. Para esta evaluación se usa un conjunto de datos en memoria, no una base de datos persistente. Los cambios manuales en el archivo requieren reiniciar el servidor.

## 4. Despliegue en Render
La misma aplicación Express sirve el frontend y la API, por lo que se puede publicar como un solo **Web Service**:
1. Sube esta carpeta a un repositorio de GitHub.
2. En Render selecciona **New + → Web Service** y conecta el repositorio.
3. Usa estos valores:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** el plan disponible para tu cuenta.
4. Pulsa **Create Web Service** y espera a que el despliegue termine.
5. Abre la URL generada por Render. Verifica la página y agrega `/api`, `/api/productos`, `/api/categorias`, `/api/promociones` y `/api/servicios` para comprobar cada endpoint.
6. No escribas `localhost` en el frontend: el proyecto usa rutas relativas (`/api`) y se comunica con la API publicada en el mismo dominio.

**Importante:** el despliegue no se ha realizado desde este archivo. Debes publicar el proyecto en tu propia cuenta y pegar la URL real de Render en tu informe. No inventes capturas ni afirmes que el despliegue se completó hasta comprobarlo.

## 5. Estructura
```text
NEFFY_TECH_Evaluacion_DAW/
├── server.js
├── package.json
├── src/
│   └── datos.js
├── public/
│   ├── index.html
│   ├── css/
│   │   └── estilos.css
│   └── js/
│       └── app.js
├── INFORME_EVALUACION.md
└── README.md
```

## 6. Pruebas para evidencias
- **API 01:** ejecutar `/api` y mostrar nombre, estado y lista de recursos.
- **API 02:** ejecutar `/api/productos` y mostrar la respuesta JSON.
- **API 03:** ejecutar `/api/categorias`, `/api/promociones` y `/api/servicios`.
- **API 04:** ejecutar `/api/productos/1` y `/api/productos/999`; el segundo debe responder 404.
- **Frontend 01:** mostrar la página de inicio y el catálogo cargado.
- **Frontend 02:** escribir `mouse` en la búsqueda.
- **Frontend 03:** elegir una categoría y cambiar el orden por precio.
- **Frontend 04:** abrir detalle de producto.
- **Frontend 05:** agregar productos, cambiar cantidades y mostrar el total del carrito.
- **Responsive:** usar las herramientas del navegador para mostrar una vista móvil.

## 7. Limitaciones y alcance
Es una demostración académica. El carrito funciona en memoria del navegador y no se guarda en una cuenta. No se procesa pago real, no se registra una orden en el servidor y los datos son de ejemplo. Para un sistema productivo se necesitarían base de datos, autenticación, persistencia de pedidos, validación de inventario en servidor y pasarela de pago.
