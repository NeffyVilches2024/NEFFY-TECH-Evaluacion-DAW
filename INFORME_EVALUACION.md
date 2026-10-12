# INFORME DE EVALUACIÓN PARCIAL — DESARROLLO DE APLICACIONES WEB

**Proyecto:** NEFFY TECH — Tienda virtual de productos tecnológicos  
**Asignatura:** Desarrollo de Aplicaciones Web (DAW)  
**Docente:** Ma. Yan Casayco Contreras  
**Fecha indicada en la consigna:** 8 de octubre de 2026  
**Estudiante:** ______________________________________

## Introducción

El proyecto NEFFY TECH propone una aplicación web para una tienda ficticia de productos tecnológicos. El objetivo es facilitar la consulta de productos, precios, categorías, promociones y servicios mediante una interfaz moderna y adaptable. La solución integra un frontend desarrollado con HTML, CSS y JavaScript con una API REST implementada con Node.js y Express. La información del catálogo se solicita mediante peticiones HTTP y se procesa en formato JSON.

## 1. Análisis de usuarios

### User Persona 1: Cliente que busca productos

- **Quién es:** estudiante o usuario que necesita comprar accesorios o componentes tecnológicos.
- **Qué necesita:** comparar opciones, revisar precios y conocer las características de cada producto.
- **Problema:** puede perder tiempo revisando información desordenada o incompleta en diferentes lugares.
- **Información que consulta:** nombre, marca, categoría, precio, stock, descripción y especificaciones.
- **Acciones:** buscar por nombre o marca, filtrar por categoría, ordenar precios, abrir el detalle y agregar productos al carrito.

### User Persona 2: Cliente que necesita orientación tecnológica

- **Quién es:** persona que quiere actualizar su computadora o resolver una necesidad tecnológica, pero no conoce todos los componentes disponibles.
- **Qué necesita:** consultar servicios de asesoría, mantenimiento y armado de computadoras; revisar productos relacionados.
- **Problema:** no siempre sabe qué componente elegir ni qué servicio puede ayudarle.
- **Información que consulta:** descripción de productos, especificaciones, categorías y servicios.
- **Acciones:** revisar servicios, consultar detalles de productos, explorar categorías y preparar una selección en el carrito.

## 2. Propuesta de valor

La empresa seleccionada es **NEFFY TECH**, una tienda ficticia de productos tecnológicos. La aplicación busca resolver la dificultad de consultar de forma rápida y organizada los productos y servicios disponibles.

Los usuarios principales son clientes que comparan productos y personas que necesitan orientación para equipar o actualizar su computadora. La aplicación muestra un catálogo dinámico con búsqueda, filtros por categoría, ordenamiento por precio o nombre, detalles por producto, promociones activas, servicios y carrito de compras.

Los recursos utilizados son Productos, Categorías, Promociones y Servicios. La propuesta se diferencia de una página estática porque obtiene los datos mediante solicitudes HTTP, actualiza la vista según la respuesta de la API, presenta estados de carga y mensajes cuando ocurre un error o no existen coincidencias.

## 3. Diseño y construcción de la API REST

La API fue planteada con Node.js y Express. Las rutas siguen el estilo REST y entregan respuestas JSON. Los datos de ejemplo se organizan en `src/datos.js`.

| Recurso | Endpoint principal | Propósito |
|---|---|---|
| Productos | `GET /api/productos` | Consultar el catálogo |
| Detalle de producto | `GET /api/productos/:id` | Consultar un producto por ID |
| Categorías | `GET /api/categorias` | Consultar grupos de productos |
| Promociones | `GET /api/promociones` | Consultar promociones activas |
| Servicios | `GET /api/servicios` | Consultar servicios tecnológicos |

El catálogo de productos permite los parámetros `buscar`, `categoria`, `minPrecio`, `maxPrecio` y `destacado`. Si el ID de producto no existe, la API devuelve el estado HTTP 404 y un mensaje JSON. Para esta versión se utilizan datos en memoria como demostración académica; no se implementó una base de datos persistente.

## 4. Consumo de la API

El frontend utiliza la función `fetch()` para enviar solicitudes HTTP a los endpoints. La función `solicitar()` comprueba `response.ok`, procesa la respuesta con `response.json()` y genera un error si el servidor devuelve una respuesta incorrecta.

Al iniciar la aplicación se consultan cuatro recursos mediante `Promise.all()`: productos, categorías, promociones y servicios. Los datos recibidos se almacenan en el estado de JavaScript y se dibujan dinámicamente en la interfaz. El detalle de cada producto se obtiene mediante una solicitud individual a `/api/productos/:id`.

La aplicación contempla mensajes de carga, errores de conexión, productos no encontrados y búsquedas sin resultados. La interfaz no incluye una lista de productos escrita manualmente en el HTML; los datos del catálogo proceden de la API.

## 5. Funcionalidades implementadas

- Inicio con presentación de la empresa y accesos de navegación.
- Catálogo dinámico de productos.
- Consulta de categorías, promociones y servicios.
- Búsqueda por nombre, marca o descripción.
- Filtro por categoría y productos destacados.
- Ordenamiento por precio ascendente, precio descendente y nombre.
- Detalle individual consultado desde la API.
- Carrito de compras en el navegador, con cantidades, eliminación y cálculo del total.
- Estados de carga, mensajes de error y aviso cuando no hay resultados.
- Diseño responsive para computadoras, tabletas y celulares.

El carrito es demostrativo: no registra pedidos en una base de datos ni procesa pagos reales.

## 6. Interfaz de usuario

La interfaz utiliza una paleta oscura con tonos azules y violetas, tarjetas de productos, jerarquía visual, navegación por secciones y botones de acción claros. Las reglas CSS incluyen puntos de adaptación para pantallas pequeñas. Se incorporan etiquetas accesibles en controles principales, mensajes de estado y textos alternativos en botones.

## 7. Integración frontend + API

La integración se realiza con peticiones HTTP `GET`. Express procesa las rutas y responde con datos JSON. JavaScript interpreta esas respuestas y genera los elementos HTML de productos, promociones, categorías y servicios. En el detalle, se realiza otra solicitud al endpoint del producto seleccionado.

Cuando frontend y API se publican en el mismo servicio de Render, el uso de rutas relativas como `/api/productos` evita tener que configurar una URL diferente para producción. El middleware CORS está habilitado para permitir solicitudes entre orígenes si se necesita separar ambos despliegues.

## 8. Organización del proyecto

- `server.js`: configura Express, middleware, endpoints y servidor web.
- `src/datos.js`: contiene los datos de demostración de los cuatro recursos.
- `public/index.html`: estructura semántica de la interfaz.
- `public/css/estilos.css`: estilos, componentes y adaptación responsive.
- `public/js/app.js`: consumo de API, renderizado, filtros, detalles y carrito.
- `package.json`: dependencias y comandos de ejecución.

Esta separación permite identificar las responsabilidades de cada archivo y facilita el mantenimiento.

## 9. Despliegue

La aplicación está preparada para desplegarse en Render como Web Service de Node. Los comandos previstos son `npm install` como comando de construcción y `npm start` como comando de inicio. Express sirve tanto los recursos estáticos del frontend como los endpoints de la API.

**URL de Render:** completar después de publicar: __________________________________

**URL de la aplicación:** si frontend y API se publican juntos, usar la misma URL del servicio.

El despliegue debe verificarse realmente antes de completar este apartado. Adjuntar capturas de la página publicada y de los endpoints funcionando.

## 10. Evidencias del proceso

Insertar capturas propias en los siguientes espacios:

1. **Evidencia 1 — Estructura del proyecto:** mostrar `server.js`, `src/datos.js` y la carpeta `public`.
2. **Evidencia 2 — API principal:** mostrar la respuesta JSON de `/api`.
3. **Evidencia 3 — Recurso Productos:** mostrar `/api/productos`.
4. **Evidencia 4 — Recursos relacionados:** mostrar categorías, promociones y servicios.
5. **Evidencia 5 — Detalle y error 404:** mostrar `/api/productos/1` y probar un ID inexistente.
6. **Evidencia 6 — Frontend:** mostrar el inicio y el catálogo cargado.
7. **Evidencia 7 — Búsqueda y filtros:** mostrar una búsqueda y una categoría seleccionada.
8. **Evidencia 8 — Detalle del producto:** mostrar la ventana con especificaciones.
9. **Evidencia 9 — Carrito:** mostrar productos, cantidades y total.
10. **Evidencia 10 — Responsive:** mostrar la aplicación en vista móvil.
11. **Evidencia 11 — Render:** mostrar el servicio desplegado y la URL pública.

Las capturas deben ser tomadas durante las pruebas reales del estudiante; no se deben reemplazar por imágenes simuladas.

## 11. Guion para la exposición

Buenos días, docente. Mi proyecto se llama NEFFY TECH y consiste en una tienda virtual de productos tecnológicos. Elegí este contexto porque permite trabajar con un catálogo y con recursos relacionados como categorías, promociones y servicios.

Para el backend utilicé Node.js y Express, que permiten crear las rutas de la API REST. La API entrega los datos en formato JSON mediante solicitudes HTTP. El recurso principal es Productos, y se complementa con Categorías, Promociones y Servicios. También implementé una ruta para consultar el detalle de un producto por su identificador y parámetros de búsqueda y filtrado.

En el frontend utilicé HTML para la estructura, CSS para el diseño responsive y JavaScript para consumir la API con `fetch()`. Cuando se abre la aplicación, se solicitan los recursos al servidor y los datos se muestran dinámicamente. El usuario puede buscar productos, filtrar por categoría, ordenar resultados, consultar especificaciones y agregar artículos al carrito.

Para el manejo de errores, se comprueba si la respuesta HTTP fue correcta y se muestran mensajes si ocurre un problema de conexión o no existen resultados. El proyecto está organizado en archivos separados para el servidor, los datos, la interfaz, los estilos y la lógica del frontend.

Finalmente, el proyecto está preparado para publicarse en Render. En la demostración mostraré la página, los endpoints de la API, el detalle de un producto y el funcionamiento del carrito. El carrito es académico y no realiza cobros reales. Muchas gracias.

## Conclusión

NEFFY TECH integra una API REST y una interfaz web responsive para consultar productos y otros recursos de una tienda tecnológica. La solución demuestra consumo de varios endpoints, procesamiento de JSON, filtros, detalle de productos, estados de carga y manejo básico de errores. Para convertirla en una tienda productiva sería necesario incorporar persistencia de datos, autenticación, gestión de pedidos y procesamiento seguro de pagos.
