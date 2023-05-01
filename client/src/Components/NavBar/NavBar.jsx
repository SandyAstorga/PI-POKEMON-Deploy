import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonName, getPokemons } from "../../Redux/actions";


const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    // const [isSearching, setIsSearching] = useState(false);
            
    const handlerInputChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setName("") //ponerlo despues de prevetdefaut para limpiar el input
        dispatch(searchPokemonName(name))
        // setIsSearching(true);
    }
    
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     dispatch(getPokemons())
    // }
    
    useEffect(() => { 
        dispatch(getPokemons());
    },[dispatch])

    return(
        <div className={style.navContainer}>
            {/* <button className={style.button_nav} onClick={handleClick}>
                <span className={style.button_span}>Reload Pokemons</span>
            </button> */}
            <Link to='/home'>
                <button className={style.button_nav}>
                    <span className={style.button_span}>Home</span>
                </button>
            </Link>
            <Link to='/about'>
            <button className={style.button_nav}>
                <span className={style.button_span}>About</span>
            </button>
            </Link>
            <Link to='/create'>
                <button className={style.button_nav}>
                    <span className={style.button_span}>Create Pokemon</span>
                </button>
            </Link>
            <button type="submit" onClick={handlerSubmit} className={style.button_nav}>
                <span className={style.button_span} >🔍</span>
            </button>
                <input type="text" value={name} placeholder="Name Pokemon" onChange={handlerInputChange} className={style.input} />
                <img src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"} alt="" className={style.img_loader}/> 
            </div>
    )
}


export default NavBar;