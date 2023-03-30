import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";

export const getPokemons = () => {
    return async function(dispatch){
        const pokemonsback = await axios.get("http://localhost:3001/pokemons"); //mi ruta del backend
        const pokemons = pokemonsback.data; //acceder a la data de la ruta 
        dispatch({ type: GET_POKEMONS, payload: pokemons});
    }
};




