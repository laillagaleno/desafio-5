const containerNoticias = document.querySelector(".noticias_container");

function contruirCard(titulo, descrição, url, imagem, data) {
  const noticia = document.createElement("article");
  noticia.innerHTML = `
    <a href="${url}">
        <div class="news_data">
            <div class="news_posted_at">${data}</div>
        </div>
        <div class="news_thumb"> <img src="${imagem}" alt=""></div>
        <div class="news_title">
        ${titulo}
        </div>
        <div class="news_resume">
        ${descrição}
        </div>
    </a>
    `;

  return noticia;
}

async function buscarNoticias() {
    const conexao = await fetch("http://localhost:3000/noticias");

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}


async function noticiasRecentes(quantidade = 4) {
    try {
        const noticias = await buscarNoticias();

        const noticiasFiltradas = noticias.slice(0, quantidade);

        noticiasFiltradas.forEach((element) =>
        containerNoticias.appendChild(
          contruirCard(
            element.titulo,
            element.descricao,
            element.url,
            element.imagem,
            element.data
          )
        )
      );

    } catch (error) {
      containerNoticias.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de vídeos</h2>`;
    }
}



noticiasRecentes(4);