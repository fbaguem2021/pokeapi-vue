export default {
    props: ['pokemon','favourites','team','teamCapacity'],
    emits: ['favourite-clicked','team-clicked'],
    template: /*html*/ `
    <div class="col mt-3">
        <div class="card" data-bs-theme="light">
            <img :src="pokemon.sprites.front_default" class="card-img-top">
            <div class="card-footer">
                <div class="d-flex flex-row-reverse">
                    <button
                        @click="setFavourite(pokemon.name)"
                        class="btn ms-1"
                        :class="{ 'btn-outline-danger': !isFavourite, 'btn-danger text-white': isFavourite }"
                        ><i class="bi" :class="{ 'bi-heart': !isFavourite, 'bi-heart-fill': isFavourite }"></i>
                    </button>
                    <button
                        @click="setTeamMember(pokemon.name)"
                        class="btn me-1"
                        :class="{ 'btn-outline-secondary': !isTeam, 'btn-warning text-white': isTeam }"
                        ><i class="bi" :class="{ 'bi-briefcase': !isTeam, 'bi-briefcase-fill': isTeam }"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            isFavourite: false,
            isTeam: false
        }
    },
    mounted() {
        // console.log('holamundo');
    },
    methods: {
        setTeamMember(pokemon_name) {
            this.isTeam = !this.team.includes(pokemon_name) && this.team.length < this.teamCapacity
            const data = { name: pokemon_name, newValue: this.isTeam }
            this.$emit('team-clicked', data)
        },
        setFavourite(pokemon_name) {
            this.isFavourite = !this.favourites.includes(pokemon_name)
            const data = { name: pokemon_name, newValue: this.isFavourite }
            this.$emit('favourite-clicked',data)
        }
    },
    watch: {
        favourites: {
            handler(NEW, OLD) {
                // // this.isFavourite = this.favourites.includes(this.pokemon.name)
                // this.isFavourite = NEW.includes(this.pokemon.name)
                // console.log(this.pokemon.name,'is charmander?',NEW.includes(this.pokemon.name))
                let found = false
                NEW.forEach(n => {
                    if (n == this.pokemon.name) {
                        found = true
                    }
                    this.isFavourite = found
                })
            },
            immediate: true,
            deep: true
        },
        team: {
            handler(NEW, OLD) {
                let found = false
                NEW.forEach(n => {
                    if (n == this.pokemon.name) {
                        found = true
                    }
                    this.isTeam = found
                })
            },
            immediate: true,
            deep: true
        }
    },
    
}