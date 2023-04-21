import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonName, getPokemons } from "../../Redux/actions";


const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    
    const handlerInputChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)
        // console.log(name);
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setName("") //ponerlo despues de prevetdefaut para limpiar el input
        dispatch(searchPokemonName(name))
    }
    useEffect(() => { 
        dispatch(getPokemons());
    },[dispatch])
    
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     dispatch(getPokemons())
    // }

    return(
        <div className={style.navContainer}>
            {/* <button onClick={handleClick}>Reload Pokemons</button> */}
            <Link to='/home'>
                <button className={style.button_nav}>
                    <span className={style.button_span}>Home</span>
                </button>
            </Link>
            <Link to='/create'>
                <button className={style.button_nav}>
                    <span className={style.button_span}>Create Pokemon</span>
                </button>
            </Link>
            <button type="submit" onClick={handlerSubmit} className={style.button_nav}>
                <span className={style.button_span}>Search Pokemon</span>
            </button>
            <input type="text" value={name} placeholder="Name Pokemon" onChange={handlerInputChange} className={style.input} />
        </div>
    )
}


export default NavBar;