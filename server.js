const express = require("express");
const cors = require("cors");
const path = require("path");
const { productos, categorias, promociones, servicios } = require("./src/datos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
  res.json({
    nombre: "NEFFY TECH API REST",
    estado: "Funcionando correctamente",
    version: "1.0.0",
    recursos: ["/api/productos", "/api/categorias", "/api/promociones", "/api/servicios"]
  });
});

app.get("/api/productos", (req, res) => {
  let resultado = [...productos];
  const { buscar, categoria, minPrecio, maxPrecio, destacado } = req.query;

  if (buscar) {
    const termino = buscar.toLowerCase().trim();
    resultado = resultado.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.descripcion.toLowerCase().includes(termino) ||
      p.marca.toLowerCase().includes(termino)
    );
  }
  if (categoria) {
    resultado = resultado.filter(p => p.categoriaId === Number(categoria));
  }
  if (minPrecio !== undefined && minPrecio !== "" && Number.isFinite(Number(minPrecio))) {
    resultado = resultado.filter(p => p.precio >= Number(minPrecio));
  }
  if (maxPrecio !== undefined && maxPrecio !== "" && Number.isFinite(Number(maxPrecio))) {
    resultado = resultado.filter(p => p.precio <= Number(maxPrecio));
  }
  if (destacado === "true") resultado = resultado.filter(p => p.destacado);

  res.json({ total: resultado.length, datos: resultado });
});

app.get("/api/productos/:id", (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado", mensaje: "Verifica el identificador solicitado." });
  }
  res.json(producto);
});

app.get("/api/categorias", (req, res) => res.json({ total: categorias.length, datos: categorias }));
app.get("/api/promociones", (req, res) => {
  const activas = promociones.filter(p => p.activa);
  res.json({ total: activas.length, datos: activas });
});
app.get("/api/servicios", (req, res) => res.json({ total: servicios.length, datos: servicios }));

app.use("/api", (req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado", mensaje: "Consulta /api para ver los recursos disponibles." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`NEFFY TECH disponible en http://localhost:${PORT}`));
