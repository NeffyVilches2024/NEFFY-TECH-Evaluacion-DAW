const categorias = [
  { id: 1, nombre: "Periféricos", descripcion: "Accesorios para mejorar tu experiencia de uso." },
  { id: 2, nombre: "Componentes", descripcion: "Piezas para actualizar o armar tu computadora." },
  { id: 3, nombre: "Almacenamiento", descripcion: "Unidades para guardar tus archivos." },
  { id: 4, nombre: "Redes", descripcion: "Conectividad para tu hogar o espacio de trabajo." }
];

const productos = [
  { id: 1, nombre: "Mouse Gamer RGB", marca: "HyperClick", categoriaId: 1, precio: 89.90, stock: 18, destacado: true, icono: "🖱️", descripcion: "Mouse ergonómico con iluminación RGB y sensibilidad ajustable.", especificaciones: ["Iluminación RGB", "6 botones", "Conexión USB"] },
  { id: 2, nombre: "Teclado Mecánico", marca: "KeyPro", categoriaId: 1, precio: 179.90, stock: 12, destacado: true, icono: "⌨️", descripcion: "Teclado mecánico ideal para escribir y jugar con comodidad.", especificaciones: ["Switches mecánicos", "Distribución español", "Retroiluminado"] },
  { id: 3, nombre: "Audífonos Estéreo", marca: "SoundMax", categoriaId: 1, precio: 119.00, stock: 20, destacado: false, icono: "🎧", descripcion: "Audífonos acolchados con micrófono integrado.", especificaciones: ["Micrófono integrado", "Conector 3.5 mm", "Control de volumen"] },
  { id: 4, nombre: "Memoria RAM 16 GB", marca: "MemoryPlus", categoriaId: 2, precio: 159.90, stock: 10, destacado: true, icono: "💾", descripcion: "Memoria RAM para mejorar la capacidad de respuesta del equipo.", especificaciones: ["16 GB", "DDR4", "Disipador térmico"] },
  { id: 5, nombre: "Placa Madre ATX", marca: "CoreBoard", categoriaId: 2, precio: 389.00, stock: 6, destacado: false, icono: "🧩", descripcion: "Placa madre compatible con configuraciones de escritorio seleccionadas.", especificaciones: ["Formato ATX", "Ranuras PCIe", "Puertos USB"] },
  { id: 6, nombre: "SSD 1 TB", marca: "FlashDrive", categoriaId: 3, precio: 249.90, stock: 14, destacado: true, icono: "💽", descripcion: "Unidad de estado sólido para iniciar el sistema y abrir aplicaciones con rapidez.", especificaciones: ["Capacidad 1 TB", "Interfaz SATA", "Bajo consumo"] },
  { id: 7, nombre: "Disco Duro 2 TB", marca: "StoreIt", categoriaId: 3, precio: 289.90, stock: 9, destacado: false, icono: "🗄️", descripcion: "Almacenamiento de gran capacidad para documentos y copias de seguridad.", especificaciones: ["Capacidad 2 TB", "Formato 3.5 pulgadas", "Interfaz SATA"] },
  { id: 8, nombre: "Router Wi-Fi Dual Band", marca: "ConnectX", categoriaId: 4, precio: 219.90, stock: 11, destacado: true, icono: "📡", descripcion: "Router para distribuir la conexión inalámbrica en distintos espacios.", especificaciones: ["Doble banda", "Puertos Ethernet", "Configuración web"] },
  { id: 9, nombre: "Cable de Red Cat 6", marca: "NetLine", categoriaId: 4, precio: 19.90, stock: 35, destacado: false, icono: "🔌", descripcion: "Cable de red para conexiones cableadas estables.", especificaciones: ["Categoría 6", "Conectores RJ45", "Longitud 3 m"] },
  { id: 10, nombre: "Webcam Full HD", marca: "VisionPro", categoriaId: 1, precio: 139.90, stock: 8, destacado: false, icono: "📷", descripcion: "Cámara web para clases virtuales, reuniones y transmisiones.", especificaciones: ["Resolución Full HD", "Micrófono integrado", "Conexión USB"] }
];

const promociones = [
  { id: 1, titulo: "Semana Gamer", descripcion: "Precios especiales en periféricos seleccionados.", descuento: 10, etiqueta: "GAMER10", activa: true },
  { id: 2, titulo: "Actualiza tu equipo", descripcion: "Encuentra componentes y almacenamiento para tu PC.", descuento: 8, etiqueta: "UPGRADE8", activa: true },
  { id: 3, titulo: "Conecta mejor", descripcion: "Promoción referencial en productos de redes.", descuento: 5, etiqueta: "REDES5", activa: true }
];

const servicios = [
  { id: 1, nombre: "Asesoría tecnológica", descripcion: "Orientación para elegir componentes compatibles con tus necesidades.", icono: "💡" },
  { id: 2, nombre: "Mantenimiento preventivo", descripcion: "Revisión general y recomendaciones para el cuidado del equipo.", icono: "🛠️" },
  { id: 3, nombre: "Armado de PC", descripcion: "Apoyo en la selección y ensamblaje de componentes de computadora.", icono: "🖥️" }
];

module.exports = { productos, categorias, promociones, servicios };
