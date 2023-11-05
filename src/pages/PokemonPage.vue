<template>
  <div class="container" v-if="!gameover">
    <div class="contet">  
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
          @click="newgame" v-if="fallas >= 0 && fallas<10"  
          >New Game</button>
      </div>

      <div v-if="mostrar">
        <button @click="resetGame" >Restart</button>
      </div>
    
    </div>
    

    <div  class="table" v-if="isLoading">
      <table border="1">
        <thead>
        <tr>
          <th>Aciertos</th>
          <th>Fallidos</th>
              
         </tr>     
        </thead>

        <tbody>
                <tr>
                  <td>{{correctas}}</td>
                  <td>{{fallas}}</td>
                </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>


  <div v-if="gameover">
    <div class="game-over-overlay">
      <p class="game-over-text">GAME OVER</p>
    <button @click="resetGame">Restart</button>
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
          showasnwers:false,
          isLoading: true,
          fallas:0,
          correctas:0,
          mostrar:false,
          gameover:false
      }
    },
    /* Creamos Un metodo donde tendre una funcion asyncrona en la cual espera una promesa del getpokemonoptions y
    Almacenamos en el array pokemonArr */
    methods:{
         async mixPokemonArray(){
          this.isLoading = false;
          this.pokemonArr =  await getPokemonOptions()
          this.isLoading = true;
         
          /*Aqui tenemos el objeto reactivo   */
          //console.log(this.pokemonArr);

          /*Con esto obtenemos el indice  de un id  del rango de 0 a 3*/
          const randon = Math.floor(Math.random() * 4)

          /*Con esto mostramos la data del iindice generado*/
          this.pokem = this.pokemonArr[randon]
          

          console.log(this.pokem)
          
                 
        },

        traerpokem(pokemonId) {

          const pokems = this.pokemonArr.find(p => p.id == pokemonId)
          const pokn = this.pokem
          if (pokems.id !== pokn.id) {
            this.message = `Fallaste , es el pokemon ${pokn.name}`;
            this.fallas++
            if (this.fallas >= 10) {
              this.message = "GAME OVER";
              this.mostrar= true
              this.gameover = true;
            }
          }
          else {
            this.message = `Correcto `
            this.correctas++
          }

          this.showpokemn = true
          this.showasnwers = true
        },
        newgame(){
        
          this.showpokemn=false
          this.showasnwers=false
          this.pokem=null
          this.mixPokemonArray()

        },
        resetGame() {
      this.showpokemn = false;
      this.showasnwers = false;
      this.pokem = null;
      this.fallas = 0;
      this.correctas=0
      this.mostrar=false
      this.gameover=false // Reinicia el contador de fallas
      this.mixPokemonArray();

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
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  
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
.contet{
  display: flex;
  justify-content: center;
  width: auto;
  

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
.game-over-text {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    text-align: center;
  }
  .game-over-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }
  .game-over-text {
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    color: white;
    margin-bottom: 20px;
    animation: fadeIn 1s ease-in-out; 
  }
  .game-over-text button {
    font-size: 24px;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .game-over-text button:hover {
    background-color: #2980b9;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
@media screen and (max-width: 510px) {
  .table{
    width: 45%;
    
  }
  .contet{
    margin-top: 70px;
    flex-direction: column;
    
  }
  
}


</style>