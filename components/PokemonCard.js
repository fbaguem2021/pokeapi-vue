export default {
    props: ['pokemon','team','favourites'],
    emits: ['favourite-clicked','team-clicked'],
    template: /*html*/ `
    <div class="col mt-3">
        <div class="card" data-bs-theme="light">
            <img :src="pokemon.sprites.front_default" class="card-img-top">
            <div class="card-footer">
                <div class="d-flex flex-row-reverse">
                    <button
                        @click="setFabourite()"
                        class="btn ms-1"
                        :class="{ 'btn-outline-danger': !isFabourite, 'btn-danger text-white': isFabourite }"
                        ><i class="bi" :class="{ 'bi-heart': !isFabourite, 'bi-heart-fill': isFabourite }"></i>
                    </button>
                    <button
                        @click="setTeamMember()"
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
            isFabourite: false,
            isTeam: false
        }
    },
    mounted() {
        console.log('holamundo');
    },
    methods: {
        setTeamMember() {
            // this.$emit
            // this.isTeam=!this.isTeam
        },
        setFabourite() {
            this.isFabourite=!this.isFabourite
            const data = { name: this.pokemon.name, newValue: this.isFabourite }
            this.$emit('favourite-clicked',data)
        }
    },
    watch: {
        favourites: {
            handler(NEW, OLD) {
                // // this.isFabourite = this.favourites.includes(this.pokemon.name)
                // this.isFabourite = NEW.includes(this.pokemon.name)
                // console.log(this.pokemon.name,'is charmander?',NEW.includes(this.pokemon.name))
                let found = false
                NEW.forEach(n => {
                    if (n == this.pokemon.name) {
                        found = true
                    }
                    this.isFabourite = found
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