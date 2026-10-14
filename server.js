const express = require("express");
const cors = require("cors");
const path = require("path");

const pontos = require("./data/pontos.json");

const app = express();
const PORT = 3000;

app.use(cors());

app.use("/fotos", express.static(path.join(__dirname, "fotos")));
app.use(express.static(path.join(__dirname, "frontend")));

function sortear(array) {
  return array[Math.floor(Math.random() * array.length)];
}

app.get("/api/pontos/aleatorio", (req, res) => {
  const todasCategorias = Object.keys(pontos);
  const categoriaSorteada = sortear(todasCategorias);
  const fotoSorteada = sortear(pontos[categoriaSorteada]);

  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${categoriaSorteada}/${fotoSorteada}`
  });
});

app.get("/api/pontos/:categoria", (req, res) => {
  const categoria = req.params.categoria.toLowerCase();

  if (!pontos[categoria]) {
    return res.status(404).json({
      status: "error",
      message: `Ponto turístico "${categoria}" não encontrado`
    });
  }

  const fotoSorteada = sortear(pontos[categoria]);

  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${categoria}/${fotoSorteada}`
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});