export default {
    template: /*html*/`
    <mi-navbar></mi-navbar>
    <div class="container mt-2">
        <div class="card">
            <div class="card-body">
                <form name="formbuscar">
                    <div class="row  mx-1 p-0 rounded border border-dark bg-dark">
                        <div class="col-4 p-0">
                            <select id="filtro" name="filtro"
                                class="form-select border"
                                aria-label="Filtro"
                                v-model="selectedType">
                                <option disabled :value="null" selected>Escoja un Tipo</option>
                                <option v-for="(type, index) in types" :key="index" :value="type.url">{{ type.name }}</option>
                            </select>
                        </div>
                        <input id="valor" name="valor"
                            type="text"
                            class="col-7 form-input border"
                            v-model="selectedType"
                            disabled>
                        <button
                            type="submit"
                            class="col-1 btn text-white border">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </form>
                <div class="row row-cols-5">
                    <pokemon-card 
                        v-for="pokemon in pokemonsInfo" 
                        :pokemon="pokemon">
                    </pokemon-card>
                </div>
            </div>
        </div>
    </div>
    `,
    data(){
        return {
            baseUrl: 'https://pokeapi.co/api/v2/',
            types: [],
            selectedType: null,
            pokemons: [],
            pokemonsInfo: [],
            favouritePokemons: [],
        }
    },
    // setup() {
    //     const baseUrl= 'https://pokeapi.co/api/v2/'
    //     const types= []
    //     const selectedType= null
    //     const pokemons= []
    //     const pokemonsInfo= []
    //     const favouritePokemons= []
    //     return { baseUrl,types,selectedType,pokemons,pokemonsInfo,favouritePokemons }
    // },
    mounted() {
        this.getTypes()
        this.getPokemons()
        this.getPokemonsInfo()
    },
    methods:{
        url(filter='', value='') {
            return `${this.baseUrl}${filter}/${value}`
        },
        getTypes() {
            axios.get(this.url('type'))
            .then(response => {
                this.types = response.data.results
            })
        },
        getPokemons(filter='pokemon', value='') {
            axios.get(this.url(filter,value))
            .then(response => console.log(response.data))
        },
        getPokemonsInfo() {
           // const self = this.$data
            // console.log('self',self)
            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(json => {
                this.pokemons = json
                this.pokemonsInfo=[]
                json.results.forEach(pokemon => {
                    fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeData => { this.pokemonsInfo.push(pokeData) })
                })
            })
        }
    }
}