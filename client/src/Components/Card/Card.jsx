import style  from '../Card/Card.module.css'

const Card = (props) => {
    return(
        <div className={style.poke_card}>  
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.types}</p>
            <p>{props.image}</p>
        </div>
    )
};

export default Card;