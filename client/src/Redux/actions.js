import axios from "axios";
// las actions son objetos que describen eventos que ocurren en la aplicación 
// y se utilizan para actualizar el estado de la aplicación en Redux. 
// Estos objetos contienen un tipo y cualquier otro dato relevante para la acción.

export const GET_POKEMONS = "GET_POKEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATE = "FILTER_CREATE";
export const GET_TYPE = "GET_TYPE";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const SORT = "SORT";
export const GET_DETAILS = "GET_DETAILS";


export const getPokemons = () => { //mis pokemones desde el back
    return async function(dispatch){
        // el método dispatch en Redux se utiliza para enviar una acción a los reducers 
        // para actualizar el estado de la aplicación. 
        // La acción debe tener una propiedad "type" y puede tener una propiedad "payload" 
        // que contiene información adicional para la acción.
        const pokemonsback = await axios.get("http://localhost:3001/pokemons"); //mi ruta del backend
        const pokemons = pokemonsback.data; //acceder a la data de la ruta 
        dispatch({ 
            type: GET_POKEMONS, 
            payload: pokemons
        });
    }
};

export const getTypePokemon = () => { //llama a los types desde mi back
    return async function (dispatch) {
        var poketype = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: GET_TYPE,
            payload: poketype.data
        })
    }
}

export const filterPokemonsByTypes = (payload) => { //Los filtra por types
    return {
        type: FILTER_BY_TYPE,
        payload,
        // el payload es la sección de una acción que contiene los datos adicionales relevantes para la acción. 
        // Estos datos pueden ser de cualquier tipo y se utilizan para actualizar el estado 
        // de la aplicación en un reducer en Redux.
    }
};

export const  filterCreate = (payload) => { //Filtra por pokemons creados 
    return {
        type: FILTER_CREATE,
        payload,
    }
};

export function filterByAttack(payload) { //Filtra por ataque
    return {
        type: FILTER_BY_ATTACK,
        payload
    }
}

export function sort(order){ //Filtra alfabeticamente
    return {
        type: SORT,
        payload: order
    }
}
export const postPokemon = (payload) => {
    return async function(dispatch){
        const pokedata = await axios.post("http://localhost:3001/pokemons", payload);
        return pokedata;
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var pokedata = await axios.get("http://localhost:3001/pokemons/" + id);
            return dispatch({
                type: GET_DETAILS,
                payload: pokedata.data
            })
        } catch (error) {
            return alert("There was an unexpected error", error)
        }
    }
}

export function searchPokemonName(name) { 
    //name llega por payload
    name = name.toLowerCase()
    return async function (dispatch) {
        try {
            const infopokename = await axios.get("http://localhost:3001/pokemons?name=" + name) 
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: infopokename.data
            })
        } catch (error) {
            return alert("Pokemon Not Found")
            
        }
    }
} 

