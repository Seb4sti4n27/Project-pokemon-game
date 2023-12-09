<template>
    <div class="pokemones-asertados">
        <div v-if="pokems.length === 0">
            <p>No has acertado ningún Pokémon aún.</p>
        </div>
        <div v-else>
            <h2 v-if="correctas>=1">Pokemons Acertados {{ correctas }}</h2>
            <div class="pokemon-carousel">
                <div v-for="pokemon in pokems" :key="pokemon.id" class="pokemon-card">
                    <div class="pokeimg">
                        <img :src="getimgSrc(pokemon.id)" :alt="pokemon.name" />
                        <p>Pokemon : {{ pokemon.name }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    props: {
        pokems: {
            type: Array,
            required: true
        },
        correctas:{
            type: Number,
            required: true
        }
    },
    methods: {
        getimgSrc(pokemid) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemid}.svg`
        }

    },


};
</script>
  
<style scoped>
.pokemones-asertados {
    margin-top: 60px;
    text-align: center;
    width: 100%;
    height: 555px;
    
}

.pokemon-carousel {
    display: flex;
    overflow-x: auto;
    justify-content: flex-start;
    align-items: center;
    /* Permite desplazamiento horizontal */
    padding: 0px;
    width: 100%;
    height: 515px;
    flex-direction: row;
    border-radius: 1px solid rgb(236, 228, 228);
    
    
}

.pokemon-card {
    flex: 0 0 325px;
    margin: 0px;
    text-align: center;
    height: 370px;
    margin-bottom: 100px;
}

img {
    width: 100%;
    height: 100%;

    overflow: hidden;

}

.pokeimg {
    width: 100%;
    height: 100%;
}

p {
    color: #b9c9da;
    font-weight: 800;
    font-size: 18px;
}
</style>