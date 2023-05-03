import pokedex from "./components/Pokedex.js"
import navbar from "./components/NavBar.js"
import pokemonCard from "./components/PokemonCard.js"

// const nav = Vue.createApp(navbar)
const app = Vue.createApp(pokedex)
app.component('mi-navbar',    navbar)
app.component('pokemon-card', pokemonCard)
app.mount('pokedex-app')