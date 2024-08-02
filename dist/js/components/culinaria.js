const containerCulinaria = document.querySelector(".culinaria_container");
function contruirCard(titulo, descricao, url, imagem, categoria) {
    const noticia = document.createElement("article");
    noticia.innerHTML = `
      <li class="videos__item">
        <iframe src="${url}" title="${titulo}" frameborder="0" allowfullscreen></iframe>
        <div class="descricao-video">
            <img class="img-canal" src="${imagem}" alt="Logo do Canal">
            <h3 class="titulo-video">${titulo}</h3>
            <p class="titulo-canal">${descricao}</p>
            <p class="categoria" hidden>${categoria}</p>
        </div>
      </li>
    `;
    return noticia;
}
async function buscarCulinaria() {
    const conexao = await fetch("http://localhost:3000/culinaria");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}
async function culinariaRecentes(quantidade = 4) {
    try {
        const culinaria = await buscarCulinaria();
        const noticiasFiltradas = culinaria.slice(0, quantidade);
        console.log(noticiasFiltradas);
        noticiasFiltradas.forEach((element) => containerCulinaria.appendChild(contruirCard(element.titulo, element.descricao, element.url, element.imagem, element.categoria)));
    }
    catch (error) {
        containerCulinaria.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de vídeos</h2>`;
    }
}
culinariaRecentes(10);
const barraDePesquisa = document.querySelector("[data-pesquisa]");
barraDePesquisa.addEventListener("input", filtrarPesquisaCulinaria);
function filtrarPesquisaCulinaria() {
    const videos = document.querySelectorAll(".videos__item");
    if (barraDePesquisa.value != "") {
        for (let video of videos) {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();
            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            }
            else {
                video.style.display = "block";
            }
        }
    }
    else {
        for (let video of videos) {
            video.style.display = "hidden";
        }
    }
}
