import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from './CardsContainer.module.css'

const CardsConteiner = () => {
    
    const allpokemons = useSelector(state=>state.pokemons)

    return(
        <div className={style.poke_container}>
            {allpokemons.map(pokemon => {
                return <Card
                key={pokemon.id}
                // id = {pokemon.id}
                name = {pokemon.name}
                types = {pokemon.types}
                image = {pokemon.image}                
                />                
            })}
        </div>
    )
};

export default CardsConteiner;