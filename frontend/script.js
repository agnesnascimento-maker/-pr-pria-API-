//=====================================
// FRONT-END — Consome nossa API local
//=====================================

// ELEMENTOS DO HTML
const dogImage = document.getElementById("dogImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const dogArea = document.querySelector(".dog-area");

// URL DA API NODE.JS
const API = "http://localhost:3000/api/pontos";

// FUNÇÃO PRINCIPAL
async function buscarPontoTuristico(url) {
  dogArea.classList.add("loading");

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Resposta da API:", data);

    if (data.status === "error") {
      breedName.textContent = data.message;
      dogImage.src = "";
      return;
    }

    // Coloca a imagem no elemento <img>
    dogImage.src = data.message;

    // Extrai o nome do ponto da URL
    const partes = data.message.split("/");
    const ponto = partes[4];

    if (ponto) {
      const nomeFormatado = ponto.replace("-", " ");
      breedName.textContent = nomeFormatado.charAt(0).toUpperCase() + nomeFormatado.slice(1);
    } else {
      breedName.textContent = "";
    }

  } catch (erro) {
    console.error(erro);
    breedName.textContent = "📴 servidor offline - rode: node server.js";
    dogImage.src = "";
  } finally {
    dogArea.classList.remove("loading");
  }
}

// AÇÕES
function pontoAleatorio() {
  buscarPontoTuristico(`${API}/aleatorio`);
}

function buscarPorCategoria() {
  const categoria = breedInput.value.trim().toLowerCase();

  if (!categoria) {
    alert("Digite o nome de um ponto turístico!");
    return;
  }

  buscarPontoTuristico(`${API}/${categoria}`);
}

// EVENTOS
randomBtn.addEventListener("click", pontoAleatorio);
searchBtn.addEventListener("click", buscarPorCategoria);
dogImage.addEventListener("click", pontoAleatorio);

breedInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buscarPorCategoria();
  }
});

// Carrega o primeiro ao abrir
pontoAleatorio();