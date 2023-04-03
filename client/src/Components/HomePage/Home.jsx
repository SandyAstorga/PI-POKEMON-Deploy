import React from "react";
import { useEffect, useState } from "react"; //Hooks
import { useDispatch, useSelector } from "react-redux"; //Hooks
import { getPokemons, filterPokemonsByTypes, filterCreate, getTypePokemon, filterByAttack, sort } from "../../Redux/actions"; //Actions
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import style from '../Card/Card.module.css'
// import CardsConteiner from "../CardsContainer/CardsContainer";

const Home = () => {

    const dispatch = useDispatch(); //Despachar mis acciones

    const allpokemons = useSelector(state=>state.pokemons)
    const types = useSelector(state => state.types)
    // useSelector obtiene el array de objetos de pokemones almacenados en el store 
    // y lo asigna a la constante allpokemons

    const [ currentPage, setCurrentPage ] = useState(1); 
    //Declaro un estado local al que le paso la pagina actual y cual va a ser la pagina actual , donde se inia el estado en 1 
    const [ pokemonsPerPage ] = useState(12);
    //Estado local de la cantidad de pokemosn por pagina, arranca el estado en 12
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    //la pagina actual multiplicada por los pokemons por pagina 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    //el indice del ultimo personaje menos los pokemones por pagina me dara el indice de primer pokemon
    const currentPokemons = allpokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    // el curretPokemons sera la parte de todos los pokemones donde esta el indice del primer poke y del ultimo

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypePokemon()) //despacha los types tambien al refrescar la pagina 
    },[dispatch]); //[] para evitar un loop o error. Lo que va denntro es de lo que depende para ejecutarse
    // useEffect realiza una tarea después de que el componente ha sido montado en el DOM 
    // y cada vez que se actualiza cierta dependencia. 
    // En este caso, la tarea que se realiza es enviar una acción al store para obtener una lista de pokemons.

    const handlerFilterTypes = (e) => {
        dispatch(filterPokemonsByTypes(e.target.value))
    }

    const handlerFilterCreate = (e) => {
        dispatch(filterCreate(e.target.value))
    }

    const handlerFilterAttack = (e) => {
        dispatch(filterByAttack(e.target.value));
    }

    const handlerSort = (e) => {
        dispatch(sort(e.target.value));
    }


    return (        
        <div>
            <Pagination
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allpokemons.length}
                paginado={paginado}
            />
            <select onChange={handlerSort}>
                    <option value="Order Pokemons">Order Pokemons</option>
                    <option value="upward">A - Z</option>
                    <option value="descendant">Z - A</option>
            </select>
            <select onChange={handlerFilterAttack}>
                    <option value="Order by Attack">Order by Attack</option>
                    <option value="HighAttack">Highest Attack</option>
                    <option value="LowAttack">Lowest Attack</option>   
            </select>
            <select onChange={handlerFilterCreate}>
                    <option value="Select Pokemons">Select Pokemons</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
            </select>
            <select onChange={handlerFilterTypes}> 
                {/* usar map */}
                    <option value="Order by Type">Order by Type</option> 
                    {/* El value es mi payload */}
                    {/* <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option> 
                    <option value="ground">Ground</option> 
                    <option value="rock">Rock</option> 
                    <option value="bug">Bug</option> 
                    <option value="ghost">Ghost</option> 
                    <option value="steel">Steel</option> 
                    <option value="fire">Fire</option> 
                    <option value="water">Water</option> 
                    <option value="grass">Grass</option> 
                    <option value="electric">Electric</option> 
                    <option value="psychic">Psychic</option> 
                    <option value="ice">Ice</option> 
                    <option value="dragon">Dragon</option> 
                    <option value="dark">Dark</option> 
                    <option value="fairy">Fairy</option> 
                    <option value="unknown">Unknown</option> 
                    <option value="shadow">Shadow</option>  */}
                    {types?.map( type => (
                            <option value={type.name}>{type.name}</option>
                        )) //Selector
                    }
            </select>
            <br/>
            <br/>
            {currentPokemons?.map((pokemon) => {
                return (
                    <div className={style.container}>
                            <Card
                                key={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                types={pokemon.types}
                            />
                    </div>
                );
            })} 
            
            {/* <CardsConteiner/> */}
        </div>
    )
}

export default Home;