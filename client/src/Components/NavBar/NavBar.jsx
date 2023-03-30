import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import { useDispatch } from "react-redux";
import { getPokemons } from "../../Redux/actions";


const NavBar = () => {
    const dispatch = useDispatch();
    
    function handleClick(){
        // e.preventDefault();
        dispatch(getPokemons());
    }
    
    return(
        <div className={style.navContainer}>
            <button onClick={() => handleClick()}>Reload Pokemons</button>
            <Link to='/home'>Home</Link>
            <Link to='/create'>Create Pokemon</Link>
            <button>Search Pokemon <input/></button>
            
        </div>
    )
}


export default NavBar;