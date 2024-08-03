window.onload = function () {
  const containerNoticias = document.querySelector(".noticias_container");

  function contruirCardNoticia(
    titulo: string,
    descrição: string,
    url: string,
    imagem: string,
    data: string
  ) {
    const noticia = document.createElement("article");
    noticia.innerHTML = `
        <div class="news_data">
         ${data}
        </div>
        <div class="news_thumb"><img src="${imagem}" alt=""></div>
        <div class="news_title">
        ${titulo}
        </div>
        <div class="news_resume">
        ${descrição}
        </div>
        <a class="news_buttom" href="${url}">Ver mais</a>
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

      noticiasFiltradas.forEach(
        (element: {
          titulo: string;
          descricao: string;
          url: string;
          imagem: string;
          data: string;
        }) =>
          containerNoticias.appendChild(
            contruirCardNoticia(
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
};
