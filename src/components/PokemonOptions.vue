<template>
  <div class="options-container">
    <ul>
      <!--Todo :Para los components es improtante usar un :key como identificador -->
      <!--Todo: El evento @click  llamamos el $emite un selection y tambien mandamos el id al componente padre-->
      
      <li v-for="pokemn in pokemons" 
          :key="pokemn.id"
          
          @click="$emit('selection', pokemn.id)"
          
          >
          {{ pokemn.name }}
      </li>
      
    </ul>
  </div>

</template>

<script>
export default {
  props:{
      pokemons:{
        type:Array,
        required:true
        
        
      }
  }

}
</script>

<style Scoped>
  ul {
    /*Con esto quitamos los . de cada elemento li*/
    list-style-type: none;
    padding-right: 35px;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(24, 23, 23, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
    
}


</style>