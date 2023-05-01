import React from "react";
import { Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getPokemons } from "../../Redux/actions";
import style from './Detail.module.css'

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(getDetail(id)).then(() => setLoading(false));
        dispatch(getPokemons());
    }, [dispatch, id]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPokemons())
    }

    const pokeDetail = useSelector((state) => state.detail);

    return (
    <div>
        {/* {  pokeDetail.length > 0 ?  */}
        { loading ? (
                <img className={style.image_loading}
                    src={"https://i.gifer.com/XgZH.gif"}
                    alt="" />
            ) : (
            <div>
                <div className={style.aling_img}>
                <img src = {pokeDetail[0].image ? pokeDetail[0].image : pokeDetail[0].imagen} alt="" className={style.poke_img}/>
                <h1 className={style.info}>{pokeDetail[0].name}</h1>
                <h3 className={style.info}># {pokeDetail[0].id}</h3>
                </div>
                <div className={style.aling_info}>
                <h2 className={style.info}>Hp : {pokeDetail[0].hp}</h2>
                <h2 className={style.info}>Attack : {pokeDetail[0].attack}</h2>
                <h2 className={style.info}>Defense : {pokeDetail[0].defense}</h2>
                <h2 className={style.info}>Speed : {pokeDetail[0].speed}</h2>
                <h2 className={style.info}>Height : {pokeDetail[0].height}</h2>
                <h2 className={style.info}>Weight : {pokeDetail[0].weight}</h2>
                <h2 className={style.info}>Types : {"  "}
                        {!pokeDetail.createdInDb ?
                            pokeDetail[0].types + (" ") :
                            pokeDetail[0].types.map(el => el.name + (" "))
                        }
                </h2>
                </div>
                    <button className={style.button_back} onClick={handleClick} >
                    <Link to='/home'>
                        <span className={style.button_span}>Back</span>
                    </Link>
                    </button>
                </div> 
                // {/* : <img className={style.image_loading}
                //     src={"https://i.gifer.com/XgZH.gif"}
                //     alt="" /> } */}
            )}
    </div> 
)};

export default Detail;