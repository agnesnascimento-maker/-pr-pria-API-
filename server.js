//================================
// BACK-END — API DE PONTOS TURÍSTICOS
//================================

const express = require("express");
const cors = require("cors");
const path = require("path");

// Carrega o arquivo JSON com os pontos e imagens
const pontos = require("./data/pontos.json");

const app = express();
const PORT = 3000;

app.use(cors());

// Serve as imagens da pasta data/fotos
app.use("/fotos", express.static(path.join(__dirname, "data", "fotos")));

// Serve o HTML, CSS e JS da pasta frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Função para sortear um item do array
function sortear(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ROTA 1 - Ponto turístico aleatório
app.get("/api/pontos/aleatorio", (req, res) => {
  const categorias = Object.keys(pontos);
  const categoriaSorteada = sortear(categorias);
  const fotoSorteada = sortear(pontos[categoriaSorteada]);

  res.json({
    status: "success",
    message: `http://localhost:${PORT}/fotos/${categoriaSorteada}/${fotoSorteada}`
  });
});

// ROTA 2 - Ponto turístico por categoria
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

// Inicia o servidor Node.js
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});