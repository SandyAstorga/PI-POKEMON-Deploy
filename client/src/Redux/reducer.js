import { GET_POKEMONS, FILTER_BY_TYPE, FILTER_CREATE, GET_POKEMON_NAME, POST_POKEMON, GET_TYPE, FILTER_BY_ATTACK, SORT, GET_DETAILS } from "./actions";

const initialState = {
    pokemons: [],
    allpokemons: [],
    types: [],
    detail: []
        
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
            const typesfiltered =  // Va a almacenar el filtrado del array de allpokemons
            action.payload === "Order by Type"  //Ternario que que evalua si el valor del atributo payload dentro del objeto action es igual a "all"
            ? allpokemons //mostrara todos los pokemones
            : allpokemons.filter((el) => el.types.includes(action.payload));
            //Si no es igual a "all", los va a filtrar por el typo que incluya el valor del payload 
            //El tipo de pokemon esoecificado en payload
            return{ //retorna el estado actualizado de los pokemones filtrados
                ...state,
                pokemons: typesfiltered
        };

        case FILTER_CREATE: //Filtra por pokemones creados y de la api
            // const allpokes = state.allpokemons
            const createdFilter =
            action.payload === "Created"
            ? state.allpokemons.filter((e) => e.createdInDb)
            : state.allpokemons.filter((e) => !e.createdInDb);
            return {
                ...state,
                pokemons:
                action.payload === "Select Pokemons" 
                ? state.allpokemons : createdFilter
            }; //No lo renderiza si llamo a los types cuando creo...

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
        
        // case RELOAD_POKEMONS:
        //     return {
        //         ...state, 
        //         pokemons: action.payload, //retorna todo lo que me mande la accion de pokemons
        //         allpokemons: action.payload
        //     }

        case GET_POKEMON_NAME: ///NOOO
            return {
                ...state,
                pokemons: action.payload
            }

        default:
            return { ...state };
    }
    
};

export default rootReducer;