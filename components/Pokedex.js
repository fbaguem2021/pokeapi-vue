export default {
    template: /*html*/`
    <mi-navbar></mi-navbar>
    <div class="container mt-2">
        <div class="card">
            <div class="card-body">
                <form name="formbuscar" @submit.prevent="sortPokemons()">
                    <div class="row  mx-1 p-0 rounded border border-dark bg-dark">
                        <div class="col-4 p-0">
                            <select id="filtro" name="filtro"
                                class="form-select border"
                                aria-label="Filtro"
                                v-model="selectedType">
                                <option disabled :value="null" selected>Escoja un Tipo</option>
                                <option :value="null">Ninguno</option>
                                <option v-for="(type, index) in types" :key="index" :value="type.name">{{ type.name }}</option>
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
                <div class="row row-cols-6">
                    <pokemon-card 
                        v-for="(pokemon, index) in pokemons_filtered"
                        :key="pokemon.id+'-'+pokemon.name"
                        :pokemon="pokemon"
                        :favourites="favouritePokemons"
                        :team="team"
                        :team-capacity="team_capacity"
                        @favourite-clicked="manageFavourites"
                        @team-clicked="manageTeam">
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
            pokemons_filtered: [],
            favouritePokemons: [],
            team: [],
            team_capacity: 6,
        }
    },
    mounted() {
        // console.log('holamundo');
        this.getTypes()
        this.getPokemons(15)
    },
    methods:{
        url(filter='',limit='') {
            return `${this.baseUrl}${filter}?limit=${limit}`
        },
        getTypes() {
            /* axios.get(this.url('type'))
            .then(response => {
                this.types = response.data.results
            }) */
            fetch(this.url('type'))
            .then(response => response.json())
            .then(json => {
                this.types = json.results
            })
        },
        getPokemons(limit) {
            fetch(this.url('pokemon',limit))
            .then(response => response.json())
            .then(json => {
                this.pokemons=[]
                this.pokemons_filtered=[]
                const promises = json.results.map( pokemon => {
                    return fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeData => {
                        this.pokemons.push(pokeData)
                        this.pokemons_filtered.push(pokeData)
                    })
                })
                Promise.all(promises).then(() => {
                    this.pokemons_filtered.sort( (a,b) => a.id - b.id )
                })
            })
        },
        getPokemons_old() {
            fetch(this.url('pokemon',15))
            .then(response => response.json())
            .then(json => {
                this.pokemons = []
                this.pokemons_filtered = []
                json.results.forEach(pokemon => {
                    fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeData => { 
                        this.pokemons.push(pokeData)
                        this.pokemons_filtered.push(pokeData)
                        this.pokemons.sort((a,b)=>{
                            if (a.id < b.id) {
                                return -1
                            }
                            if (b.id < a.id) {
                                return 1
                            }
                            return 1
                        })
                    })
                })
            })
        },
        sortPokemons() {
            if (this.selectedType) {
                this.pokemons_filtered=[]
                this.pokemons.forEach( (p, index) => {
                    p.types.forEach(t => {
                        if (t.type.name == this.selectedType) {
                            this.pokemons_filtered.push(p)
                        }
                    })
                })
            } else {
                this.pokemons_filtered = this.pokemons
            }
            // this.pokemons_filtered = this.pokemons
        },
        manageFavourites(e) {
            const index = this.favouritePokemons.indexOf(e.name)
            if (index >= 0) {
                this.favouritePokemons.splice(index, 1)
            } else {
                this.favouritePokemons.push(e.name)
            }
        },
        manageTeam(e) {
            const index = this.team.indexOf(e.name)
            const inTeam = this.team.includes(e.name)
            const freeSpace = this.team.length < this.team_capacity
            const fullTeam = this.team.length === this.team_capacity

            if (inTeam) {
                this.team.splice(index, 1)
            } else if (freeSpace) {
                this.team.push(e.name)
            } else if (fullTeam) {
            }
        }
    }
}