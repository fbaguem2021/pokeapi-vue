export default {
    template: /*html*/ `
    <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
            <img :src="image" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                Pokedex
            </a>
        </div>
    </nav>
    `,
    data() {
        return {
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'
        }
    }
}