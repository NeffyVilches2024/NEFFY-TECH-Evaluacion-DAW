const API = "/api";
const state = { productos: [], categorias: [], promociones: [], servicios: [], carrito: [], filtro: "todos", busqueda: "", categoria: "", orden: "relevancia" };
const $ = (selector) => document.querySelector(selector);
const moneda = (valor) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(valor);

async function solicitar(endpoint) {
  const respuesta = await fetch(`${API}${endpoint}`);
  if (!respuesta.ok) {
    let detalle = `Error HTTP ${respuesta.status}`;
    try { const cuerpo = await respuesta.json(); detalle = cuerpo.mensaje || cuerpo.error || detalle; } catch {}
    throw new Error(detalle);
  }
  return respuesta.json();
}

async function iniciarAplicacion() {
  $("#estadoProductos").textContent = "Cargando catálogo desde la API...";
  try {
    const [productos, categorias, promociones, servicios] = await Promise.all([
      solicitar("/productos"), solicitar("/categorias"), solicitar("/promociones"), solicitar("/servicios")
    ]);
    state.productos = productos.datos;
    state.categorias = categorias.datos;
    state.promociones = promociones.datos;
    state.servicios = servicios.datos;
    dibujarCategorias();
    dibujarProductos();
    dibujarPromociones();
    dibujarServicios();
    $("#totalProductosHero").textContent = state.productos.length;
  } catch (error) {
    $("#estadoProductos").innerHTML = `No se pudo cargar la información de la API. <br><small>${escapar(error.message)}</small><br><button class="button outline" onclick="iniciarAplicacion()">Reintentar</button>`;
    $("#contadorResultados").textContent = "API no disponible";
    $("#listaPromociones").innerHTML = `<p class="state-message">No se pudieron cargar las promociones. Comprueba la conexión con la API.</p>`;
    $("#listaServicios").innerHTML = `<p class="state-message">No se pudieron cargar los servicios. Intenta nuevamente.</p>`;
  }
}

function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, caracter => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[caracter]));
}
function categoriaNombre(id) { return state.categorias.find(c => c.id === id)?.nombre || "General"; }

function dibujarCategorias() {
  $("#filtroCategoria").innerHTML = '<option value="">Todas las categorías</option>' + state.categorias.map(c => `<option value="${c.id}">${escapar(c.nombre)}</option>`).join("");
}
function productosFiltrados() {
  let lista = [...state.productos];
  if (state.busqueda) {
    const termino = state.busqueda.toLowerCase();
    lista = lista.filter(p => `${p.nombre} ${p.marca} ${p.descripcion}`.toLowerCase().includes(termino));
  }
  if (state.categoria) lista = lista.filter(p => String(p.categoriaId) === state.categoria);
  if (state.filtro === "destacados") lista = lista.filter(p => p.destacado);
  if (state.orden === "menor") lista.sort((a,b) => a.precio-b.precio);
  if (state.orden === "mayor") lista.sort((a,b) => b.precio-a.precio);
  if (state.orden === "nombre") lista.sort((a,b) => a.nombre.localeCompare(b.nombre, "es"));
  return lista;
}
function dibujarProductos() {
  const lista = productosFiltrados();
  $("#contadorResultados").textContent = `${lista.length} producto${lista.length === 1 ? "" : "s"}`;
  $("#estadoProductos").hidden = lista.length > 0;
  if (!lista.length) {
    $("#listaProductos").innerHTML = "";
    $("#estadoProductos").textContent = state.productos.length ? "No encontramos productos con esos criterios. Prueba otra búsqueda o categoría." : "No hay productos disponibles en este momento.";
    return;
  }
  $("#listaProductos").innerHTML = lista.map(p => `
    <article class="product-card">
      <div class="product-art">${p.destacado ? '<span class="product-badge">DESTACADO</span>' : ""}<span class="stock-label">${p.stock > 0 ? `Stock: ${p.stock}` : "Agotado"}</span><span class="product-emoji">${escapar(p.icono)}</span></div>
      <div class="product-info"><div class="product-category">${escapar(categoriaNombre(p.categoriaId))}</div><h3>${escapar(p.nombre)}</h3><div class="product-brand">${escapar(p.marca)}</div><p class="product-description">${escapar(p.descripcion)}</p>
      <div class="product-bottom"><div class="price"><small>S/ </small>${p.precio.toFixed(2)}</div><button class="add-button" data-agregar="${p.id}" aria-label="Agregar ${escapar(p.nombre)} al carrito" ${p.stock < 1 ? "disabled" : ""}>+</button></div>
      <button class="details-button" data-detalle="${p.id}">Ver detalles del producto ↗</button></div>
    </article>`).join("");
}
function dibujarPromociones() {
  $("#listaPromociones").innerHTML = state.promociones.length ? state.promociones.map(p => `<article class="promo-card"><div class="promo-percent">${p.descuento}% OFF</div><h3>${escapar(p.titulo)}</h3><p>${escapar(p.descripcion)}</p><span class="promo-code">${escapar(p.etiqueta)}</span></article>`).join("") : '<p class="state-message">No hay promociones activas.</p>';
}
function dibujarServicios() {
  $("#listaServicios").innerHTML = state.servicios.length ? state.servicios.map(s => `<article class="service-card"><div class="service-icon">${escapar(s.icono)}</div><h3>${escapar(s.nombre)}</h3><p>${escapar(s.descripcion)}</p></article>`).join("") : '<p class="state-message">No hay servicios registrados.</p>';
}
async function verDetalle(id) {
  $("#contenidoModal").innerHTML = '<p class="state-message">Consultando detalle en la API...</p>';
  $("#modalProducto").classList.add("open");
  $("#modalProducto").setAttribute("aria-hidden", "false");
  try {
    const p = await solicitar(`/productos/${id}`);
    $("#contenidoModal").innerHTML = `<div class="modal-product-art">${escapar(p.icono)}</div><div class="eyebrow">${escapar(categoriaNombre(p.categoriaId))} · ${escapar(p.marca)}</div><h2 id="modalTitulo">${escapar(p.nombre)}</h2><p>${escapar(p.descripcion)}</p><div class="modal-price">${moneda(p.precio)}</div><p><b>Stock disponible:</b> ${p.stock}</p><h3>Especificaciones</h3><ul>${p.especificaciones.map(e => `<li>${escapar(e)}</li>`).join("")}</ul><button class="button primary full" data-agregar="${p.id}" ${p.stock < 1 ? "disabled" : ""}>Agregar al carrito +</button>`;
  } catch (error) {
    $("#contenidoModal").innerHTML = `<h2 id="modalTitulo">No se pudo cargar el detalle</h2><p>${escapar(error.message)}</p>`;
  }
}
function cerrarModal() { $("#modalProducto").classList.remove("open"); $("#modalProducto").setAttribute("aria-hidden", "true"); }
function mostrarToast(mensaje) {
  const toast = $("#toast"); toast.textContent = mensaje; toast.classList.add("show");
  window.clearTimeout(mostrarToast.temporizador);
  mostrarToast.temporizador = window.setTimeout(() => toast.classList.remove("show"), 2200);
}
function agregarCarrito(id) {
  const p = state.productos.find(x => x.id === Number(id));
  if (!p) return mostrarToast("No se encontró el producto.");
  const item = state.carrito.find(x => x.id === p.id);
  if (item) {
    if (item.cantidad >= p.stock) return mostrarToast("Alcanzaste el stock disponible.");
    item.cantidad++;
  } else {
    if (p.stock < 1) return mostrarToast("Producto sin stock.");
    state.carrito.push({ id: p.id, cantidad: 1 });
  }
  dibujarCarrito(); mostrarToast("Producto agregado al carrito.");
}
function cambiarCantidad(id, cambio) {
  const item = state.carrito.find(x => x.id === Number(id));
  const producto = state.productos.find(x => x.id === Number(id));
  if (!item || !producto) return;
  item.cantidad += cambio;
  if (item.cantidad <= 0) state.carrito = state.carrito.filter(x => x.id !== item.id);
  else if (item.cantidad > producto.stock) { item.cantidad = producto.stock; mostrarToast("Alcanzaste el stock disponible."); }
  dibujarCarrito();
}
function dibujarCarrito() {
  const cantidad = state.carrito.reduce((s,i) => s+i.cantidad, 0);
  const total = state.carrito.reduce((s,i) => s + (state.productos.find(p=>p.id===i.id)?.precio || 0)*i.cantidad, 0);
  $("#contadorCarrito").textContent = cantidad; $("#totalCarrito").textContent = moneda(total);
  if (!state.carrito.length) { $("#itemsCarrito").innerHTML = '<div class="cart-empty">Tu carrito está vacío.<br>Explora el catálogo para agregar productos.</div>'; return; }
  $("#itemsCarrito").innerHTML = state.carrito.map(i => { const p=state.productos.find(x=>x.id===i.id); return `<div class="cart-item"><div class="cart-item-icon">${escapar(p.icono)}</div><div><h4>${escapar(p.nombre)}</h4><small>${moneda(p.precio)} por unidad</small><div class="qty-controls"><button data-cantidad="${p.id}" data-cambio="-1" aria-label="Restar">−</button><span>${i.cantidad}</span><button data-cantidad="${p.id}" data-cambio="1" aria-label="Sumar">+</button></div></div><div class="cart-item-price">${moneda(p.precio*i.cantidad)}</div></div>`; }).join("");
}
function abrirCarrito() { $("#panelCarrito").classList.add("open"); $("#panelCarrito").setAttribute("aria-hidden","false"); }
function cerrarCarrito() { $("#panelCarrito").classList.remove("open"); $("#panelCarrito").setAttribute("aria-hidden","true"); }

document.addEventListener("click", event => {
  const agregar = event.target.closest("[data-agregar]");
  const detalle = event.target.closest("[data-detalle]");
  const cantidad = event.target.closest("[data-cantidad]");
  if (agregar) agregarCarrito(agregar.dataset.agregar);
  if (detalle) verDetalle(detalle.dataset.detalle);
  if (cantidad) cambiarCantidad(cantidad.dataset.cantidad, Number(cantidad.dataset.cambio));
  if (event.target.matches("[data-cerrar-modal]")) cerrarModal();
  if (event.target === $("#modalProducto")) cerrarModal();
  const chip = event.target.closest("[data-filtro]");
  if (chip) {
    state.filtro = chip.dataset.filtro === "destacados" ? "destacados" : "todos";
    document.querySelectorAll(".chip-filter").forEach(b => b.classList.toggle("active", b === chip));
    dibujarProductos();
  }
});
$("#buscarProducto").addEventListener("input", e => { state.busqueda=e.target.value.trim(); dibujarProductos(); });
$("#filtroCategoria").addEventListener("change", e => { state.categoria=e.target.value; dibujarProductos(); });
$("#ordenarProductos").addEventListener("change", e => { state.orden=e.target.value; dibujarProductos(); });
$("#abrirCarrito").addEventListener("click", abrirCarrito);
$("#cerrarCarrito").addEventListener("click", cerrarCarrito);
$("#vaciarCarrito").addEventListener("click", () => { state.carrito=[]; dibujarCarrito(); mostrarToast("Carrito vacío."); });
$("#finalizarCompra").addEventListener("click", () => {
  if (!state.carrito.length) return mostrarToast("Agrega al menos un producto antes de continuar.");
  const resumen = state.carrito.map(i => { const p=state.productos.find(x=>x.id===i.id); return `${p.nombre} x${i.cantidad}`; }).join(", ");
  mostrarToast("Pedido de demostración preparado.");
  alert(`Resumen del pedido académico:\n${resumen}\nTotal: ${$("#totalCarrito").textContent}\n\nEsta evaluación no procesa pagos reales.`);
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { cerrarModal(); cerrarCarrito(); } });
dibujarCarrito();
iniciarAplicacion();
