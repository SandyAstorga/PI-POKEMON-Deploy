import React from 'react';
import style  from '../Card/Card.module.css'
//Aqui es donde hacemos el componente Card que tendra los 3 props que va a mostrar

const Card = ({name, types, imagen}) => { //destructiring
    return(
        <div >
            <br/> 
            <p>{name}</p>
            <br/>
            <img className={style.poke_img} src={imagen} alt={name}/>
            <br/>
            <p>🔹{types[0]} 🔹 {types[1]} 🔹 {types[2]}</p>        
        </div>
    )
};

export default Card;