import pokemonApi from "@/api/PokemonApi"


const  getpokemons= ()=>{

    /*Con esto creamos una const  creamos un arreglo de 650 que estara dentro de un array  */
    const pokemonsArr= Array.from( Array(650) )
    /*Con la funcion map  retornamos el valor de los indices y sumado +1 funcion map ( any , index , []) */
    return pokemonsArr.map((_,index)=>index+1)

}
const getPokemonOptions=async()=>{
    /*Con esto creamos la logia de mezclar los valores del array con el sort y el math random  */
    const mixedPokemons= getpokemons().sort(()=>Math.random() -0.5)
    /*Con esto usamos el splice para traer los 4 primeros numeros de pokemon */
    const pokemons=  await getPokemonNames(mixedPokemons.splice(0,4))

    return pokemons;
    
    
}

const getPokemonNames= async([a,b,c,d] = []) =>{

    /*con esto hacemos llamada a la api y traemos y mandamos el /4 o id 4 */
    //const resp= await pokemonApi.get(`/4`)

    /*Estas son las variables donde se guardan todos los datos*/
    //console.log(resp.data.name , resp.data.id );
    const promiseArr=[
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
        
    ]

    
    const [p1 , p2 ,p3 ,p4] = await Promise.all(promiseArr)


    return [
    
        {name : p1.data.name, id: p1.data.id},
        {name : p2.data.name, id: p2.data.id},
        {name : p3.data.name, id: p3.data.id},
        {name : p4.data.name, id: p4.data.id}
            
    ]

    
    
    
    
}





export default getPokemonOptions