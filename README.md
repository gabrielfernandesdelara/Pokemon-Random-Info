<div align="center">

<img src="Src/Images/Leavanny-icon.png" alt="Logo Pokemon-Random-Info" width="110" />

<h1>Pokemon-Random-Info</h1>

<p>Monte um time de Pokémon aleatório usando dados da <strong>PokéAPI</strong>.<br/>
Escolha ou passe cada Pokémon sorteado até completar seu time de seis.</p>

<p>
  <!-- Depois do deploy, descomente: <a href="LINK_DO_DEPLOY"><strong>Acessar o site</strong></a> · -->
  <a href="https://github.com/gabrielfernandesdelara/Pokemon-Random-Info/issues/new">Reportar um bug</a>
  ·
  <a href="https://github.com/gabrielfernandesdelara/Pokemon-Random-Info/issues/new">Sugerir uma funcionalidade</a>
</p>

<p>
  <img src="https://img.shields.io/badge/status-em%20finalizado-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/github/last-commit/gabrielfernandesdelara/Pokemon-Random-Info?style=for-the-badge&label=%C3%BAltimo%20commit" alt="Último commit" />
</p>

</div>

---

<details>
  <summary><strong>Sumário</strong></summary>

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como rodar localmente](#como-rodar-localmente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Roadmap](#roadmap)
- [Aviso legal](#aviso-legal)
- [Autor](#autor)

</details>

## Sobre o projeto

<!-- Salve um print em Src/Images/screenshot.png e descomente:
<div align="center">
  <img src="Src/Images/screenshot.png" alt="Página inicial do Pokemon-Random-Info" width="80%" />
  <p><sub><em>Página inicial. O layout pode sofrer alterações.</em></sub></p>
</div>
-->

O **Pokemon-Random-Info** é um montador de times aleatórios. A cada sorteio aparece um Pokémon com nome, imagem e tipos, e você decide se ele entra no time ou se prefere passar a vez. Os passes são limitados, então cada escolha conta.

O projeto foi criado para praticar o consumo de APIs com JavaScript puro: todas as informações vêm da [PokéAPI](https://pokeapi.co) em tempo real, usando `fetch` com `async/await`, e o time fica salvo no próprio navegador.

## Funcionalidades

- Sorteio de um Pokémon aleatório entre os **898** primeiros da Pokédex
- Exibição de nome, imagem e tipos de cada Pokémon sorteado
- Time de até **6 Pokémon**, sem repetições
- **10 passes** para trocar o Pokémon sorteado
- Quando os passes acabam, o time é **completado automaticamente** com Pokémon aleatórios
- Time salvo no navegador com `localStorage`, mesmo depois de recarregar a página
- Botão para resetar o time e os passes

## Tecnologias

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Pok%C3%A9API-EF5350?style=for-the-badge" alt="PokéAPI" />
</p>

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura da página |
| CSS3 | Estilização do layout |
| JavaScript | Lógica do sorteio, montagem do time e manipulação do DOM |
| PokéAPI | Fonte dos dados de cada Pokémon (nome, imagem e tipos) |
| localStorage | Persistência do time no navegador |

## Como rodar localmente

O projeto não tem dependências nem etapa de build.

```bash
# 1. Clone o repositório
git clone https://github.com/gabrielfernandesdelara/Pokemon-Random-Info.git

# 2. Entre na pasta
cd Pokemon-Random-Info
```

Depois é só abrir o `index.html` no navegador. É preciso estar conectado à internet, porque os dados vêm da PokéAPI.

## Estrutura de pastas

```
Pokemon-Random-Info/
├── index.html             # Página principal
├── scripts/
│   └── script.js          # Consumo da PokéAPI e lógica do time
├── styles/
│   └── style.css          # Estilos da página
└── Src/
    └── Images/            # Fundo, favicon e imagem da Pokébola
```

## Roadmap

- [x] Sorteio de Pokémon com a PokéAPI
- [x] Montagem de time sem repetições
- [x] Sistema de passes limitados
- [x] Preenchimento automático do time
- [x] Time salvo no navegador
- [x] Design reformulado
- [x] Design responsivo

## Aviso legal

Este é um projeto pessoal e **não possui afiliação** com a Nintendo, Game Freak ou The Pokémon Company. Pokémon e todos os nomes e imagens relacionados pertencem aos seus respectivos donos. Os dados são fornecidos pela [PokéAPI](https://pokeapi.co).

## Autor

<p>
  Desenvolvido por <strong>Gabriel Fernandes de Lara</strong>
</p>

<p>
  <a href="https://www.linkedin.com/in/gabrielfernandesdelara/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://github.com/gabrielfernandesdelara"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>
