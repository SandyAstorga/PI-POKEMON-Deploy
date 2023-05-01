import { GET_POKEMONS, FILTER_BY_TYPE, FILTER_CREATE, GET_POKEMON_NAME, POST_POKEMON, GET_TYPE, FILTER_BY_ATTACK, SORT, GET_DETAILS } from "./actions";

const initialState = {
    pokemons: [],
    detail: [],
    allpokemons: [],
    types: []        
}
// un reducer es una función pura que recibe una acción y el estado actual de la aplicación, 
// y devuelve un nuevo estado actualizado de la aplicación.
const rootReducer = (state = initialState, action) => { //estado inicial
    switch (action.type) {

        case GET_POKEMONS: //primer caso todos los pokemones
            return { 
                ...state, 
                pokemons: action.payload, //retorna todo lo que me mande la accion de pokemons
                allpokemons: action.payload
        };

        case FILTER_BY_TYPE://segundo caso filter
            const allpokemons = state.allpokemons; //El estado de todos los pokemones
            // const typesfiltered =  action.payload;// Va a almacenar el filtrado del array de allpokemons
            // action.payload === "Order by Type"  //Ternario que que evalua si el valor del atributo payload dentro del objeto action es igual a "all"
            // ? allpokemons //mostrara todos los pokemones
            // : allpokemons.filter((el) => el.types.includes(action.payload));
            const typeToFilter = action.payload;
            let typesFiltered;
            //Si no es igual a "all", los va a filtrar por el typo que incluya el valor del payload 
            //El tipo de pokemon esoecificado en payload
            if (typeToFilter === "Order by Type") { // Si el tipo a filtrar es "all", muestra todos los pokémon
                typesFiltered = allpokemons;
            } else {
                typesFiltered = allpokemons.filter((el) => el.types.includes(typeToFilter)); // Filtrar por el tipo especificado en el payload
                if (typesFiltered.length === 0) { // Si no hay pokémon del tipo especificado, muestra todos los pokémon
                    typesFiltered = allpokemons;
                }
            }
            return{ //retorna el estado actualizado de los pokemones filtrados
                ...state,
                pokemons: typesFiltered
        };

        case FILTER_CREATE: //Filtra por pokemones creados y de la api
            // const allpokes = state.allpokemons
            // const createdFilter =
            // action.payload === "Created"
            // ? state.allpokemons.filter((e) => e.createdInDb)
            // : state.allpokemons.filter((e) => !e.createdInDb);
            // return {
            //     ...state,
            //     pokemons:
            //     action.payload === "Select Pokemons" 
            //     ? state.allpokemons : createdFilter
            // }; 
            const allPokemons = state.allpokemons;
            const filterBy = action.payload;
            let filteredPokemons;

            if (filterBy === "Created") {
                filteredPokemons = allPokemons.filter((el) => el.createdInDb); // Filtrar por Pokémon creados
                if (filteredPokemons.length === 0) { // Si no hay Pokémon creados, muestra todos los Pokémon
                    filteredPokemons = allPokemons;
                }
            } else {
                filteredPokemons = allPokemons.filter((el) => !el.createdInDb); // Filtrar por Pokémon de la API
            }
            return {
                ...state,
                pokemons: filteredPokemons
            };

        case FILTER_BY_ATTACK: //Filtra por ataque
            let attackFilter = [...state.pokemons];
            attackFilter = attackFilter.sort((a, b) => {
                if (a.attack < b.attack) {
                    return action.payload === "HighAttack" ? 1 : -1;
                }
                if (a.attack > b.attack) {
                    return action.payload === "HighAttack" ? -1 : 1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons:
                    action.payload === "Order by Attack" 
                    ? state.allpokemons : attackFilter
            };
            
        case SORT: //Filtra alfabeticamente
            let orderedCharacters = [...state.pokemons];
            orderedCharacters = orderedCharacters.sort((a, b) => {
                if (a.name < b.name) {
                    return action.payload === "upward" ? -1 : 1;
                }
                if (a.name > b.name) {
                    return action.payload === "upward" ? 1 : -1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons:
                    action.payload === "Order Pokemons" 
                        ? state.allpokemons : orderedCharacters
            };

        case POST_POKEMON: //Crear Pokemon
            return {
                ...state,
            };

        case GET_TYPE:
            return {
                ...state,
                types: action.payload,
            };
        
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        
        case GET_POKEMON_NAME: 
            return {
                ...state,
                pokemons: action.payload
            }

        default:
            return { ...state };
    }
    
};

export default rootReducer;