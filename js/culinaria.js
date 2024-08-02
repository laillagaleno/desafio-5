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

async function buscarCulinariaPorCategoria(categoria) {
  const conexao = await fetch(`http://localhost:3000/culinaria?q=${categoria}`);

  const conexaoConvertida = await conexao.json();

  return conexaoConvertida;
}



async function noticiasRecentes(quantidade = 4) {
  try {
    const noticias = await buscarCulinaria();
    const noticiasFiltradas = noticias.slice(0, quantidade);
    console.log(noticiasFiltradas);

    noticiasFiltradas.forEach((element) =>
      containerCulinaria.appendChild(
        contruirCard(
          element.titulo,
          element.descricao,
          element.url,
          element.imagem,
          element.categoria
        )
      )
    );
  } catch (error) {
    containerCulinaria.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de vídeos</h2>`;
  }
}


// async function buscarCulinaria(evento) {
//   evento.preventDefault();
//   const pesquisaData = document.querySelector("[data-pesquisa]").value;
//   const buscar = await fetch(`http://localhost:3000/culinaria?q=${pesquisaData}`);

//   const lista = document.querySelector("[data-lista]");

//   while (lista.firstChild) {
//     lista.removeChild(lista.firstChild);
//   }

//   buscar.forEach((element) =>
//     lista.appendChild(
//       contruirCard(
//         element.titulo,
//         element.descricao,
//         element.url,
//         element.imagem,
//         element.categoria
//       )
//     )
//   );

//   if (buscar.length === 0) {
//     lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível encontrar o vídeo</h2>`;
//   }

// }

// const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

// botaoDePesquisa.addEventListener("click", evento => buscarVideo(evento))

const t = buscarCulinariaPorCategoria("Arroz");

console.log(t);
noticiasRecentes(10);