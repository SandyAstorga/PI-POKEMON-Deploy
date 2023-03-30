import React from 'react';
import style  from '../Card/Card.module.css'

const Card = ({name, types, image}) => { //destructiring
    return(
        <div className={style.container}>
            <br/> 
            <p>{name}</p>
            <br/>
            <img className={style.poke_img} src={image} alt={name}/>
            <br/>
            <p>{types[0]}</p>
            <p>{types[1]}</p>
        </div>
    )
};

export default Card;