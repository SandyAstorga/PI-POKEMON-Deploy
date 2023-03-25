import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from './CardsContainer.module.css'

const CardsConteiner = () => {
    
    const pokemons = useSelector(state=>state.pokemons)

    return(
        <div className={style.poke_container}>
            {pokemons.map(pokemon=>{
                return <Card
                id = {pokemon.id}
                name = {pokemon.name}
                types = {pokemon.types}
                image = {pokemon.image}                
                />

                
            })}
        </div>
    )
};

export default CardsConteiner;