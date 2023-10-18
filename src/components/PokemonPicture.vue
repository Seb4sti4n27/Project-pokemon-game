<template>
  
    <div class="pokemon-container">
      <img :src="imgSrc" alt="pokemon" class="hidden-pokemon">
      <img v-if="ShowPokemon" :src="imgSrc" alt="pokemon" class="fade-in" id="hidden-pokemon">
     
    </div>
    
  
</template>

<script>

export default {
    props:{
      pokemonId:{
        type:Number,
        required:true

      },
      ShowPokemon:{
        type:Boolean,
        default:false,
        required:true
      }
    },
    
    computed: {
      imgSrc(){
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
      }

    }


}
</script>

<style scoped>

.pokemon-container {
    
    width: auto;
    height: 230px;
    overflow: hidden;
    position: relative;
        
}
img {
    height: 200px;
    position: absolute;
    /*Aqui quitamos los lados */ 
    left: 0;
    right: 0;
    /*Con esto de arriba abajo le ponemos 0 y auto para centrar el img*/
    margin: 0 auto;
    /*Codigo para quitar opciones del navegador */
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
     width: 100%; /* esto hará que la imagen tenga el ancho del contenedor */
     display: block
    
    
}

.hidden-pokemon {
    filter: brightness(0);
    
}


</style >

