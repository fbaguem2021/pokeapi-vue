export default {
    template: /*html*/`
    <div class="container mt-2">
        <div class="card">
            <div class="card-body">
                <form name="formbuscar">
                    <div class="row  mx-1 p-0 rounded border border-dark bg-dark">
                        <div class="col-4 p-0">
                            <select id="filtro" name="filtro"
                                class="form-select border"
                                aria-label="Filtro"
                                v-model="">
                                <option disabled selected :value="null">Escoja un Tipo</option>
                                <option v-for="(type, index) in tyoes" :key="index" :value="type.url">{{ type.name }}</option>
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
            </div>
        </div>
    </div>
    `,
    data(){
        return {
            baseUrl: 'https://pokeapi.co/api/v2/',
            types: [],
            selectedType: '',
            pokemons: [],
            favouritePokemons: [],
        }
    },
    mounted() {
        this.getTypes()
        this.getPokemons()
    },
    methods:{
        url(filter='', value='') {
            return `https://pokeapi.co/api/v2/${filter}/${value}`
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
        }
    }
}