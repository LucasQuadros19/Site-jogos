const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3b7746506fmsh534fe729d2539dbp1e4658jsnb3b810395294",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
}; //Logando na API pra receber os dados

const dive = document.getElementById("dive");
const banner = document.getElementById("bannerjs");
//variavel que recebe o getelementbyid para nao ter que ficar escrevendo isso toda vez
var idsalva = 0;
var a = 0; //variavel para controle de quantidade de jogos que irao aparecer na tela
var b = 10; //variavel para controle de quantidade de jogos que irao aparecer na tela
var filtro_escolhido = "&sort-by=popularity";
var salvofavorito = false;
var plataforma_escolhida = "all";
var favoritos = JSON.parse(localStorage.getItem("bulla")) || [];
var resultados = [];
const name = document.querySelector(".textopc"); 
function updateLocalStorage() {
  localStorage.setItem("bulla", JSON.stringify(favoritos));
}

function isInFavorite(id) {
  for (i = 0; i < favoritos.length; i++) {
    if (id === favoritos[i].id) {
      return true;
    }
  }
  return false;
}

function handleFavClick(index, btnid) {
  for (i = 0; i < favoritos.length; i++) {
    if (resultados[index].id === favoritos[i].id) {
      favoritos.splice(i, 1);
      document.getElementById(btnid).setAttribute("fill", "none");
      updateLocalStorage();
      return;
    }
  }
  document.getElementById(btnid).setAttribute("fill", "#FFFFFF");
  favoritos.push(resultados[index]);
  updateLocalStorage();
}

function ConsultarJogos() {
  //funcao que realiza o fetch
  fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${plataforma_escolhida}${filtro_escolhido}`,
    options
  )
    .then((response) => {
      response
        .json() //Transformo os dados em json
        .then((data) => printar(data)); // envio os dados chamando funcao printar indicando o parametro data (sendo os proprios dados)
    })
    .catch(() => alert("ERRO")); //Alerta de erro, caso encontre algum
}

function fetchbanner() {
  //funcao que realiza o fetch
  fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idsalva}`,
    options
  )
    .then((response) => {
      response
        .json() //Transformo os dados em json
        .then((data) => printarbanner(data));
    })
    .catch(() => alert("ERRO"));
}

const printarbanner = (resultado) => {
  console.log(resultado);
  if (!resultado) {
    return;
  }
  banner.innerHTML = `

  <div class="destaque-baner">
  
    <div class="gif-destaque">
      <img class="gif" src="${resultado.thumbnail}" alt="">
      <img class="gif2" src="${resultado.screenshots[2].image}" alt="">
    </div>
</div>
        <a href="${resultado.freetogame_profile_url}"target="_blank">
              <img class="imgbanner1" src="${resultado.screenshots[0].image}"</a>
              `;
};

const printar = (resultado) => {
  if (!resultado || resultado.length < 1) {
    return;
  }
  if (a == 0) {
    idsalva = resultado[0].id;
    fetchbanner();
  }
  //Funcao que printa os dados da API na tela do usuario
  resultados = resultado;
  console.log(resultado);
  for (a; a < b; a++) {
    console.log(resultado[a]);
    dive.innerHTML += `
        <div class="vitrine">
        <a href="${resultado[a].freetogame_profile_url}"target="_blank">
        <img class="fotojogo" src="${resultado[a].thumbnail}"></a>
        <div class="card-base-container"> 
        <p class="nomedojogo">${resultado[a].title}</p> 
        <button class="like-btn" onClick="handleFavClick(${a},${
      resultado[a].id
    })">
        <svg id="${resultado[a].id}" 
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${
          isInFavorite(resultado[a].id) ? "#FFFFFF" : "none"
        }" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg> 
        </button>    
        <div>
                           
        </div>`;
  }
};

function apagar() {
  dive.innerHTML = ""; //Funcao para apagar o conteudo escrito dentro do HTML da variavel dive, utilizado para caso
  a = 0;
  b = 10;
} //o usuario modifique o padrao de aparecimento sei la vai apagar tudo e escrever de outro jeito

ConsultarJogos(); //Aqui nesse caso eu to chamando a funcao apenas

function adicionar() {
  //Funcao adicionar para alterar as variaveis que definem a quantidade de jogos que irao aparecer
  a = b; // na tela do usuario, ela eh chamada ao clicar no botao carregar mais
  b = b + 10; //Alem de alterar as variaveis ela chama a funcao consultardadosviacep pra printar novamente
  ConsultarJogos();
}

function filtrar(filtro_botao) {
  switch (filtro_botao) {
    case "Home":
      filtro_escolhido = "&sort-by=popularity";
      apagar();
      ConsultarJogos();
      break;

    case "Moba":
      filtro_escolhido = "&category=moba";
      apagar();
      ConsultarJogos();
      break;

    case "Survival":
      filtro_escolhido = "&category=survival";
      apagar();
      ConsultarJogos();
      break;

    case "Fighting":
      filtro_escolhido = "&category=fighting";
      apagar();
      ConsultarJogos();
      break;

    case "Shooting":
      filtro_escolhido = "&category=shooter";
      apagar();
      ConsultarJogos();
      break;

    case "Fantasy":
      filtro_escolhido = "&category=fantasy";
      apagar();
      ConsultarJogos();
      break;

    case "Card game":
      filtro_escolhido = "&category=card";
      apagar();
      ConsultarJogos();
      break;

    case "Strategy":
      filtro_escolhido = "&category=strategy";
      apagar();
      ConsultarJogos();
      break;

    case "Sports":
      filtro_escolhido = "&category=sports";
      apagar();
      ConsultarJogos();
      break;
  }
}

function plataforma(filtro_plataforma) {
  switch (filtro_plataforma) {
    case "PC":
      plataforma_escolhida = "pc";
      console.log(plataforma_escolhida);
      apagar();
      ConsultarJogos();
      break;

    case "Browser":
      plataforma_escolhida = "browser";
      apagar();
      ConsultarJogos();
      break;

    case "ALL":
      plataforma_escolhida = "all";
      apagar();
      ConsultarJogos();
      break;
  }
}

function mostrarAtivo(tag) {
  var tag_li = document.getElementById("lista_menu");
  var tag_a = tag_li.getElementsByTagName("a");
  for (i = 0; i < tag_a.length; i++) {
    tag_a[i].style.backgroundColor = "";
  }
  tag.style.backgroundColor = "#660920";
}

function mostrarAtivo_plat(tag2) {
  var tag2_li2 = document.getElementById("Ulnav");
  var tag2_a2 = tag2_li2.getElementsByTagName("a");
  for (i = 0; i < tag2_a2.length; i++) {
    tag2_a2[i].style.backgroundColor = "";
  }
  tag2.style.backgroundColor = "#3D0C02";
  tag2.style.color = "white";
}

const favoriteslink = document.getElementById("favorites-link");

favoriteslink.addEventListener("click", () => {
  apagar();

  salvofavorito = true;
  printar(favoritos);
});

window.onscroll = function () {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    if (!salvofavorito) {
      adicionar();
    }
  }
};
