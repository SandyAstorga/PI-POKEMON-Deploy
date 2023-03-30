import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../Redux/actions";
import CardsConteiner from "../CardsContainer/CardsContainer";
// import style from "./Home.module.css"
// // import Card from "../Card/Card"
// // import Pagination from "../Pagination/Pagination"


const Home = () => {

    const dispatch = useDispatch(); //Despachar mis acciones
        
        useEffect(() => {
            dispatch(getPokemons());
        },[dispatch]); //[] para evitar un loop o error. Lo que va denntro es de lo que depende para ejecutarse 

//     // const [ currentPage, setCurrentPage ] = useState(1);
//     // const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12);
//     // const indexOfLastPokemon = currentPage * pokemonsPerPage;
//     // const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
//     // const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

//     // const pagination = (pageNumber) => {
//     //     setCurrentPage(pageNumber)
//     // }


    return (
        
        
        <div>
            <select>
                    <option value="normal">Normal</option>
                    <option value="upward">A - Z</option>
                    <option value="descendant">Z - A</option>
                    <option value="HighAttack">Highest Attack</option>
                    <option value="LowAttack">Lowest Attack</option>   
            </select>
            <select>
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
            </select>
            <select> 
                {/* usar map */}
                    <option value="All">All</option>
                    <option value="normal">Normal</option>
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
                    <option value="shadow">Shadow</option> 
            </select>
            <CardsConteiner/>
        </div>
       
    )
}

export default Home;