import { GET_POKEMONS } from "./actions";

const initialState = {
    pokemons: [],
        
}

const rootReducer = (state = initialState, action) => { //estado inicial
    switch (action.type) {
        case GET_POKEMONS: //primer caso
            return { ...state, pokemons: action.payload, //retorna todo lo que me mande la accion de pokemons
    };
        
        default:
            return { ...state };
    }
    
};

export default rootReducer;