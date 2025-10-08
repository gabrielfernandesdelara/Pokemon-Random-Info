document.addEventListener("DOMContentLoaded", () => {
  const btnChoose = document.getElementById("btn_choose");
  const btnPass = document.getElementById("btn_pass");
  const btnReset = document.getElementById("btn_reset");
  const teamList = document.getElementById("team_list");
  const pokemonInfo = document.getElementById("pokemon_info");
  const pokemonNome = document.getElementById("pokemon_nome");
  const pokemonImagem = document.getElementById("pokemon_imagem");
  const pokemonTipos = document.getElementById("pokemon_tipo");
  const mensagemCarregando = document.getElementById("mensagem_carregando");
  const mensagemErp = document.getElementById("mensagem_Erp");
  const pokebola = document.querySelector('img[alt="Pokebola"]');
  const maxPass = 10;
  const maxPokemon = 6;

  // Função para buscar dados do Pokémon pela API
  //async busca dados sem travar o site e await espera a resposta
  const dadosPokemon = async (identificadoPokemon) => {
    try {
      mensagemCarregando.classList.remove("hidden");
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${identificadoPokemon}`
      );
      //response é a resposta da API para javascript
      const data = await response.json();
      return {
        nome: data.name,
        imagem:
          data.sprites.versions["generation-v"]["black-white"].front_default,
        tipos: data.types.map((typeInfo) => typeInfo.type.name).join(", "),
      };
    } finally {
      mensagemCarregando.classList.add("hidden");
    }
  };

  // Função para mostrar um Pokémon aleatório junto com o tipo
  async function mostrarPokemonAleatorio() {
    mensagemErp.classList.add("hidden");
    pokebola.classList.add("hidden");
    const randomId = Math.floor(Math.random() * 898) + 1;
    const pokemon = await dadosPokemon(randomId);
    if (pokemon) {
      pokemonInfo.classList.remove("hidden");
      pokemonNome.textContent = pokemon.nome;
      pokemonImagem.src = pokemon.imagem;

      const tipos_Array = pokemon.tipos.split(", ");
      const tipos_Detalhados = await Promise.all(
        tipos_Array.map(async (tipo) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/type/${tipo}`
          );
          const data = await response.json();
          const nome = data.names.find((n) => n.language.name === "en");
          return nome ? nome.name : tipo;
        })
      );
      pokemonTipos.textContent = `Tipo: ${tipos_Detalhados.join(", ")}`;
    }
  }

  function atualizarTeamPhrase() {
    const team = JSON.parse(localStorage.getItem("team")) || [];
    const teamPhrase = document.querySelector('.team_conteiner p:nth-child(2)');
    const restantes = maxPokemon - team.length;
    if (restantes > 0) {
        teamPhrase.textContent = `Pegue mais ${restantes} Pokémon${restantes > 1 ? 's' : ''} para o seu time`;
    } else {
        teamPhrase.textContent = "Esse é seu time";
    }
}

  // Função para atualizar a lista do time na tela
  function atualizarTeamList() {
    const team = JSON.parse(localStorage.getItem("team")) || [];
    teamList.innerHTML = "";
    team.forEach((pokemon) => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${pokemon.imagem}" alt="${pokemon.nome}">${pokemon.nome} (${pokemon.tipos})`;
      teamList.appendChild(li);
    });
    atualizarTeamPhrase();
  }

  // Função para adicionar Pokémon ao time e salvar no localStorage
  function adicionarPokemonAoTime(pokemon) {
    const team = JSON.parse(localStorage.getItem("team")) || [];
    if (team.length >= maxPokemon) return;
    if (team.some(p => p.nome === pokemon.nome)) return;
    team.push(pokemon);
    localStorage.setItem("team", JSON.stringify(team));
    atualizarTeamList();
  }

  // Adiciona evento ao botão "Escolher Pokémon"
  btnChoose.addEventListener("click", () => {
    if (!pokemonInfo.classList.contains("hidden")) {
      const team = JSON.parse(localStorage.getItem("team")) || [];
      if (team.length >= maxPokemon) return;
      const pokemonEscolhido = {
        nome: pokemonNome.textContent,
        tipos: pokemonTipos.textContent.replace("Tipo: ", ""),
        imagem: pokemonImagem.src,
      };
      // Impede repetidos
      if (team.some(p => p.nome === pokemonEscolhido.nome)) return;
      adicionarPokemonAoTime(pokemonEscolhido);
    }
  });

  let passCount = maxPass;

  const passText = document.querySelector('.team_conteiner p');

  function atualizarPassText() {
      passText.textContent = `Você só pode passar ${passCount} vezes`;
  }

  // Atualiza o texto ao carregar a página
  atualizarPassText();

  btnPass.addEventListener("click", async () => {
      if (passCount > 0) {
          passCount--;
          atualizarPassText();
          await mostrarPokemonAleatorio();
          if (passCount === 0) {
              btnPass.disabled = true;
              const team = JSON.parse(localStorage.getItem("team")) || [];
              if (team.length < maxPokemon) {
                await completarTimeAutomaticamente();
              }
            }
      }
  });

  btnReset.addEventListener("click", () => {
      localStorage.removeItem("team");
      atualizarTeamList();
      passCount = maxPass;
      atualizarPassText();
      btnPass.disabled = false;
      pokemonInfo.classList.add("hidden");
      pokebola.classList.remove("hidden");
  });

  // Atualiza a lista do time ao carregar a página
  atualizarTeamList();
  btnPass.addEventListener("click", mostrarPokemonAleatorio);
  btnReset.addEventListener("click", () => {
    localStorage.removeItem("team");
    atualizarTeamList();
  });

  const team = JSON.parse(localStorage.getItem("team")) || [];
  if (team.length >= maxPokemon) btnChoose.disabled = true;
  else btnChoose.disabled = false;

  async function completarTimeAutomaticamente() {
    let team = JSON.parse(localStorage.getItem("team")) || [];
    while (team.length < maxPokemon) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const pokemon = await dadosPokemon(randomId);
      if (pokemon && !team.some(p => p.nome === pokemon.nome)) {
        team.push({
          nome: pokemon.nome,
          tipos: pokemon.tipos,
          imagem: pokemon.imagem
        });
        localStorage.setItem("team", JSON.stringify(team));
        atualizarTeamList();
      }
    }
  }
});
