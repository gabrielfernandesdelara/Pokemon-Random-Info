document.addEventListener('DOMContentLoaded', () => {
    const btnChoose = document.getElementById('btn_choose');
    const btnPass = document.getElementById('btn_pass');
    const btnReset = document.getElementById('btn_reset');
    const teamList = document.getElementById('team_list');
    const pokemonInfo = document.getElementById('pokemon_info');
    const pokemonNome = document.getElementById('pokemon_nome');
    const pokemonImagem = document.getElementById('pokemon_imagem');
    const pokemonTipos = document.getElementById('pokemon_tipo');
    const pokemonGeracao = document.getElementById('pokemon_geracao');
    const mensagemCarregando = document.getElementById('mensagem_carregando');
    const mensagemErp = document.getElementById('mensagem_Erp');
    const maxPass = 10;

    // Função para buscar dados do Pokémon pela API
    const fetchPokemon = async (identificadoPokemon) => {
        try {
            mensagemCarregando.classList.remove('hidden');
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificadoPokemon}`);
            const data = await response.json();
            return {
                nome: data.name,
                imagem: data.sprites.front_default,
                tipos: data.types.map(typeInfo => typeInfo.type.name).join(', ')
            };
        } finally {
            mensagemCarregando.classList.add('hidden');
        }
    };

    // Função para mostrar um Pokémon aleatório junto com o tipo
    async function mostrarPokemonAleatorio() {
        mensagemErp.classList.add('hidden');
        const randomId = Math.floor(Math.random() * 898) + 1;
        const pokemon = await fetchPokemon(randomId);
        if (pokemon) {
            pokemonInfo.classList.remove('hidden');
            pokemonNome.textContent = pokemon.nome;
            pokemonImagem.src = pokemon.imagem;
            pokemonImagem.alt = pokemon.nome;

            const tipos_Array = pokemon.tipos.split(', ');
            const tipos_Detalhados = await Promise.all(
                tipos_Array.map(async (tipo) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
                    const data = await response.json();
                    const nome = data.names.find(n => n.language.name === 'en');
                    return nome ? nome.name : tipo;
                })
            );
            pokemonTipos.textContent = `Tipo: ${tipos_Detalhados.join(', ')}`;
        }
    }

    mostrarPokemonAleatorio();
    mensagemErp.classList.remove('hidden');

    btnPass.addEventListener('click', mostrarPokemonAleatorio);
});