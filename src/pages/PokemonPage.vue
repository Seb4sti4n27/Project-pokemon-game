<template>
  <div class="container" v-if="!gameover">
    <div class="contet">
      <h1 v-if="!pokem"><span class="loader"></span></h1>

      <div v-else class="conte">
        <div id="poke">
          <h1>¿Who is this pokemon?</h1>
        </div>

        <!-- TODO : Img-->

        <PokemonPictureVue :pokemonId="pokem.id" :ShowPokemon="showpokemn" />

        <!-- TODO: Opciones -->

        <PokemonOptionsVue :pokemons="pokemonArr" @selection="traerpokem" :seleccion="selection" />


        <!--Todo: Aqui podemos usar el template en caso que no queramos el div -->

        <div v-if="showasnwers">
          <h3 class="fade-in" style="color: black;">{{ message }}</h3>
          <button @click="newgame" v-if="fallas >= 0 && fallas < 10" class="newbutton">New Game</button>
        </div>

        <div v-if="mostrar">
          <button @click="resetGame">Restart</button>
        </div>

      </div>


      <!-- Mostrar tarjetas de Pokémon acertados -->
      <div v-if="pokem" class="pokacertado">
        <!-- <h1>Pokemons acertados</h1> -->
        <!-- ... (otro contenido) -->
        <PokemonesAsertados :pokems="pokemonesAcertados" :correctas="correctas" />
      </div>

      <div v-if="pokem" class="aconrts">
        <li style="color: rgb(238, 235, 235); width: 20px; margin-left: 15px; margin-right: 20px; ">
          <a class="nav-link py-2 px-0 px-lg-2" href="https://github.com/Seb4sti4n27" target="_blank" rel="noopener"
            style="width: auto; color:  rgb(95, 175, 175);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="navbar-nav-svg" viewBox="0 0 512 499.36"
              role="img">
              <title>GitHub</title>
              <path fill="currentColor" fill-rule="evenodd"
                d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z">
              </path>
            </svg>
          </a>
        </li>
        <p style="position: absolute; margin-top: 25px; font-size: 15px; margin-right: 5px;">Github</p>
        <!-- </a> -->
        <!-- <li class="nav-item col-6 col-lg-auto"></li> -->
      </div>
    </div>
  </div>


  <div v-if="gameover ">
    <div class="game-over-overlay">
      <p class="game-over-text">GAME OVER 😔</p>
      <h1>Haz Acertado {{ correctas }} Pokemons</h1>
      <h2 v-if="correctas>=5">Eres Fanatico de Pokemons 😄 </h2>
      <button @click="resetGame" class="restart"> Restart</button>
    </div>
  </div>
</template>

<script>
import PokemonPictureVue from '@/components/PokemonPicture'
import PokemonOptionsVue from '@/components/PokemonOptions'
import getPokemonOptions from '@/helpers/getPokemonOptions'
import PokemonesAsertados from "@/components/PokemonesAsertados.vue";

//console.log(getPokemonOptions());


export default {
  name: 'PokemonPage',
  components: { PokemonOptionsVue, PokemonPictureVue, PokemonesAsertados },

  data() {
    return {
      /* Aqui creamos un objeto reactivo en la cual vue verificara cuando se realize el cambio y reenderizar*/
      pokemonArr: [],
      pokem: null,
      showpokemn: false,
      message: null,
      showasnwers: false,
      isLoading: true,
      fallas: 0,
      correctas: 0,
      mostrar: false,
      gameover: false,
      pokemonesAcertados: [],
      imgSrc: "",
      selection: false

    }
  },
  /* Creamos Un metodo donde tendre una funcion asyncrona en la cual espera una promesa del getpokemonoptions y
  Almacenamos en el array pokemonArr */
  methods: {
    async mixPokemonArray() {
      this.isLoading = false;
      this.pokemonArr = await getPokemonOptions()
      this.isLoading = true;

      /*Aqui tenemos el objeto reactivo   */
      //console.log(this.pokemonArr);

      /*Con esto obtenemos el indice  de un id  del rango de 0 a 3*/
      const randon = Math.floor(Math.random() * 4)

      /*Con esto mostramos la data del iindice generado*/
      this.pokem = this.pokemonArr[randon]


      // console.log(this.pokem)


    },

    traerpokem(pokemonId) {
      const pokems = this.pokemonArr.find(p => p.id == pokemonId)
      const pokn = this.pokem

      if (pokems.id !== pokn.id) {
        this.message = ` ❌ oh!! you failed try again 😞`;
        this.fallas++
        if (this.fallas >= 10) {
          this.message = "GAME OVER";
          this.mostrar = true
          this.gameover = true;
        }
      }
      else {
        this.message = ` ✅ Yeah !!! it's right 😎 `
        this.correctas++
        // Agregar el Pokémon acertado al array
        this.pokemonesAcertados.push(pokn);

      }

      this.showpokemn = true
      this.showasnwers = true
      this.selection = true
    },

    updateImgSrc(imgSrc) {
      this.imgSrc = imgSrc; // Actualizar la imagen correcta
    },
    newgame() {

      this.showpokemn = false
      this.showasnwers = false
      this.pokem = null
      this.selection = false
      this.mixPokemonArray()

    },
    resetGame() {
      this.showpokemn = false;
      this.showasnwers = false;
      this.pokem = null;
      this.fallas = 0;
      this.correctas = 0
      this.mostrar = false
      this.gameover = false // Reinicia el contador de fallas
      this.pokemonesAcertados = []
      this.selection = false
      this.mixPokemonArray();

    }
  },

  /*A quie usamos ciclo de vida de los components*/
  mounted() {
    this.mixPokemonArray();
  }

}
</script>

<style scoped>
.conte {
  position: relative;
  border: 1px solid rgb(121, 116, 116);
  border-radius: 25px;
  box-shadow: 5px 5px 20px rgb(195, 202, 204);
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  max-width: 325px;
  padding: 10px;
  background: rgb(255, 253, 253);
  background: linear-gradient(90deg, rgba(255, 253, 253, 1) 0%, rgba(135, 130, 130, 0.9780287114845938) 35%, rgba(31, 31, 31, 0.9528186274509804) 100%);

}


button {
  margin-bottom: 15px;
}

.table {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

}

#custom {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 15%;
  font-size: 16px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: rgb(107, 107, 93)
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

}

.contet {
  display: flex;
  justify-content: center;
  width: auto;
  margin-top: 30px;


}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  margin: 10px;
  padding: 5px;
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

.pokacertado {
  border: 1px solid rgb(121, 116, 116);
  border-radius: 30px;
  box-shadow: 0 10px 30px 10px rgb(100, 100, 98);
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  max-width: 325px;
  margin-left: 40px;
  padding: 10px;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(68, 68, 68, 0.9780287114845938) 35%, rgba(136, 136, 136, 0.9528186274509804) 100%);
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

.newbutton {
  padding: 10px;
  border-radius: 5px;
  background-color: #a19494;
  transition: all 0.5s;
}

.newbutton:hover {
  cursor: pointer;
  color: white;
  background-color: #3f3e3e;
  padding-inline-end: 30px;
  padding-inline-start: 30px;
  transition: all 0.5s;
}

.restart {
  padding: 10px;
  border-radius: 5px;
  background-color: #817a7a;
  transition: all 0.4s;
}

.restart:hover {
  cursor: pointer;
  background-color: #3f3e3e;
  color: white;
  padding-inline-end: 30px;
  padding-inline-start: 30px;
  transition: all 0.4s;
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
  .contet {
    margin-top: 35px;
    flex-direction: column;

  }

  .container {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .pokacertado {
    margin-top: 50px;
    justify-content: center;
    align-items: center;
    height: 50%;
    margin-left: 0px;
  }
  .aconrts{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 54px;
  }
  .aconrts p{
    color: #e2d9d9;
  }
}

/* todo:  Anconrtacs */
.aconrts h1 {
  font-size: 2.5em;
  font-weight: 700;
  color: #b9c9da;
  margin: 0;
  padding: 0;
  text-align: center;

}

.aconrts {
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: start;
  width: auto;
}

.aconrts li {
  list-style: none;
  width: 20px;
  height: 23px;
  font-size: 23px;
  border-radius: 20px;
}

.aconrts li,
p {
  margin-top: 0px;

}

.aconrts p {
  color: #ffffff;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}

.aconrts p:hover {
  color: #b4b3b3;


}</style>