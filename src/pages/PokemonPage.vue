<template>
  <div class="container">

    <h1 v-if="!pokem"><span class="loader"></span></h1>
  
    <div v-else class="conte">
      <h1>¿Quien es este Pokemon?</h1>
      
      <!-- TODO : Img-->

      <PokemonPictureVue 
      :pokemonId="pokem.id" 
      :ShowPokemon="showpokemn"/>

      <!-- TODO: Opciones -->

      <PokemonOptionsVue 
      :pokemons="pokemonArr"
      @selection="traerpokem" />


      <!--Todo: Aqui podemos usar el template en caso que no queramos el div -->

      <div v-if="showasnwers">
        <h3 class="fade-in">{{ message }}</h3>
        <button
          @click="newgame"  
          >New Game </button>
      </div>
    
    </div>

    <div class="table">
      <table border="1">
        <thead>
        <tr>
          <th>Aciertos</th>
          <th>Fallidos</th>
              
         </tr>     
        </thead>

        <tbody>
                <tr>
                  <td>num</td>
                  <td>num</td>
                </tr>
        </tbody>
    </table>
      
  </div>

  </div>
  
  
  

</template>

<script>
import PokemonPictureVue from '@/components/PokemonPicture'
import PokemonOptionsVue from '@/components/PokemonOptions'

import getPokemonOptions from '@/helpers/getPokemonOptions'

//console.log(getPokemonOptions());


export default {
    name:'PokemonPage',
    components: {PokemonOptionsVue , PokemonPictureVue},

    data(){
      return{
        /* Aqui creamos un objeto reactivo en la cual vue verificara cuando se realize el cambio y reenderizar*/
          pokemonArr:[],
          pokem:null,
          showpokemn:false,
          message:null,
          showasnwers:false
      }
    },
    /* Creamos Un metodo donde tendre una funcion asyncrona en la cual espera una promesa del getpokemonoptions y
    Almacenamos en el array pokemonArr */
    methods:{
         async mixPokemonArray(){
          this.pokemonArr =  await getPokemonOptions()
         
          /*Aqui tenemos el objeto reactivo   */
          //console.log(this.pokemonArr);

          /*Con esto obtenemos el indice  de un id  del rango de 0 a 3*/
          const randon = Math.floor(Math.random() * 4)

          /*Con esto mostramos la data del iindice generado*/
          this.pokem = this.pokemonArr[randon]

          console.log(this.pokem)
          
                 
        },

        traerpokem(pokemonId){

          const pokems = this.pokemonArr.find(p => p.id == pokemonId)
          const pokn=this.pokem
          if (pokems.id !== pokn.id){
            this.message=`Fallaste , es el pokemon ${pokn.name}`;
          }
          else{
            this.message=`Correcto `
          }
          
          this.showpokemn=true
          this.showasnwers=true
        },
        newgame(){
        
          this.showpokemn=false
          this.showasnwers=false
          this.pokem=null
          this.mixPokemonArray()

        }
        

    },
    
    /*A quie usamos ciclo de vida de los components*/
    mounted(){
       this.mixPokemonArray();
    }

}
</script>

<style scoped>

.conte{
  position: relative;
  border: 1px solid rgb(58, 57, 57);
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  max-width: 325px;
  padding: 10px;
  background-color: rgb(178, 224, 228)
  
  
  
}
button{
  margin-bottom: 15px;
}
.table{
  margin-right: 20%;
  margin-bottom: 25%;
  justify-content: space-around;
  align-items: center;
  
}

table{
  border-collapse: collapse;
  width: 15%;
  font-size: 16px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: rgb(221, 220, 156)
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.table th ,td{
  color: black;
  border: 1px solid #ddd;
  padding: 5px;
  text-transform: capitalize;
  
}
.loader {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #FFF;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 


</style>