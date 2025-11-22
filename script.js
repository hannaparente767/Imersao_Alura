let cardContainer = document.querySelector(".card-container"); 
let campoBusca = document.querySelector("#busca-input");
let botaoBusca = document.querySelector("#botao-busca");
let dados = [];

// Função para carregar os dados do JSON apenas uma vez
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        // renderizarCards(dados); // Removemos a renderização inicial
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        cardContainer.innerHTML = '<p class="sem-resultados">Falha ao carregar os dados. Tente novamente mais tarde.</p>';
    }
}

// Função que realiza a busca/filtragem
function iniciarBusca() {
    // Se o campo de busca estiver vazio, limpa a tela e não faz nada.
    if (campoBusca.value.trim() === "") {
        cardContainer.innerHTML = '';
        return;
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    if (dados.length === 0) {
        cardContainer.innerHTML = '<p class="sem-resultados">Nenhum resultado encontrado para sua busca.</p>';
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = ` 
            <img src="${dado.imagem}" alt="Capa do mangá ${dado.nome}" class="manga-img">
            <div class="card-content">
                <h2>${dado.nome}</h2>
                <p>${dado.ano}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}

// Adiciona os "ouvintes de evento" quando o documento HTML estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    carregarDados(); // Carrega os dados e exibe todos os cards
    botaoBusca.addEventListener("click", iniciarBusca);
    campoBusca.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            iniciarBusca();
        }
    });
});
