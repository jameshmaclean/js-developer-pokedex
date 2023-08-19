const pokeApi = {};

const title = document.getElementById("title");
const img = document.getElementById("pokemonImage");
const number = document.getElementById("number");
const content = document.getElementById("content")
const pokeDetail = document.getElementById("pokemonDetail");
const navigateButton = document.getElementById("navigateBack")

pokeApi.getPokemonDetail = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  console.log(url);
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

navigateButton.addEventListener('click', ()=>{
  window.location.href = "/"
})

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonId = urlParams.get("number");
  pokeApi
    .getPokemonDetail(pokemonId)
    .then((pokemonData) => {
      content.className = `pokemon ${pokemonData.types[0].type.name}`;
      title.textContent = pokemonData.name;
      number.innerText = `#${pokemonId}`;
      img.src = pokemonData.sprites.front_default;
      img.alt = pokemonData.name;
      const statsList = pokemonData.stats.map((stat) => {
        return `
              <li class="stat">${stat.stat.name} : ${stat.base_stat}</li>
              `;
      });
      pokeDetail.innerHTML += statsList.join("");
      console.log(pokemonData);
    })
    .catch((error) => {
      console.error("Erro ao carregar detalhes do Pokémon:", error);
    });
});
