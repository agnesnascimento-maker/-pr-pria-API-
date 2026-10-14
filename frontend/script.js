const spotImage = document.getElementById("spotImage");
const spotName = document.getElementById("spotName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const spotInput = document.getElementById("spotInput");
const spotArea = document.querySelector(".spot-area");

const API = "/api/pontos";

async function buscarPonto(endpoint) {
  if (spotArea) spotArea.classList.add("loading");

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === "error" || !data.message) {
      if (spotName) spotName.textContent = data.message || "Não encontrado";
      return;
    }

    spotImage.src = data.message;

    const partes = data.message.split("/");
    const nomeCategoria = partes[partes.length - 2];
    if (spotName) {
      spotName.textContent = nomeCategoria.replace("-", " ").toUpperCase();
    }

  } catch (erro) {
    console.error(erro);
    if (spotName) spotName.textContent = "Erro ao conectar com a API";
  } finally {
    if (spotArea) spotArea.classList.remove("loading");
  }
}

function pontoAleatorio() {
  buscarPonto(`${API}/aleatorio`);
}

function buscarPorCategoria() {
  const categoria = spotInput.value.trim().toLowerCase();

  if (!categoria) {
    alert("Digite um ponto turístico!");
    return;
  }

  buscarPonto(`${API}/${categoria}`);
}

if (randomBtn) randomBtn.addEventListener("click", pontoAleatorio);
if (searchBtn) searchBtn.addEventListener("click", buscarPorCategoria);
if (spotImage) spotImage.addEventListener("click", pontoAleatorio);

if (spotInput) {
  spotInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      buscarPorCategoria();
    }
  });
}

pontoAleatorio();