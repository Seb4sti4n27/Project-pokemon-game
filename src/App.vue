<template>
  <!-- <img class="fade-in" alt="Vue logo" src="./assets/logo.png">-->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <PokemonPageVue/>
</template>

<script>
import PokemonPageVue from './pages/PokemonPage.vue'


export default {
  name: 'App',
  components: {
    PokemonPageVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d5064;
  margin-top: 0px;
  width: 100%; 
  height: 100vh; background: rgba(25,22,84,1); background: -moz-linear-gradient(left, rgba(25,22,84,1) 0%, rgba(67,198,172,1) 100%); background: -webkit-gradient(left top, right top, color-stop(0%, rgba(25,22,84,1)), color-stop(100%, rgba(67,198,172,1))); background: -webkit-linear-gradient(left, rgba(25,22,84,1) 0%, rgba(67,198,172,1) 100%); background: -o-linear-gradient(left, rgba(25,22,84,1) 0%, rgba(67,198,172,1) 100%); background: -ms-linear-gradient(left, rgba(25,22,84,1) 0%, rgba(67,198,172,1) 100%); background: linear-gradient(to right, rgba(25,22,84,1) 0%, rgba(67,198,172,1) 100%); 
 
  
  
}
</style>
