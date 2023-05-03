export default {
    props: ['pokemon','team','favourites'],
    emits: ['favourite-clicked','team-clicked'],
    template: /*html*/ `
    <div class="col mt-3">
        <div class="card">
            <img :src="pokemon.sprites.front_default" class="card-img-top">
            <div class="card-body">
                
            </div>
        </div>
    </div>
    `,
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.pokemon)
    },
    methods: {
        
    }
}