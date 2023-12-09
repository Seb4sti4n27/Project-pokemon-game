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
  color: #b9c9da;
  margin-top: 0px;
  width: 100%; 
  height: 100vh; background: rgb(100, 99, 129); background: -moz-linear-gradient(left, rgb(127, 125, 158) 0%, rgb(131, 167, 160) 100%); background: -webkit-gradient(left top, right top, color-stop(0%, rgb(116, 113, 172)), color-stop(100%, rgb(143, 168, 163))); background: -webkit-linear-gradient(left, rgb(131, 130, 151) 0%, rgb(112, 133, 129) 100%); background: -o-linear-gradient(left, rgba(25,22,84,1) 0%, rgb(119, 172, 161) 100%); background: -ms-linear-gradient(left, rgba(25,22,84,1) 0%, rgb(156, 172, 169) 100%); background: linear-gradient(to right, rgb(165, 165, 177) 0%, rgb(126, 146, 142) 100%); 
 
  
  
}
@media screen and (max-width: 510px) {
    #app{
      height: 100%;
    }
}
</style>
