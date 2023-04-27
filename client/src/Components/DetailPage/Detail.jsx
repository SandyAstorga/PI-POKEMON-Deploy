import React from "react";
import { Link, useParams} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/actions";
import style from './Detail.module.css'

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const pokeDetail = useSelector((state) => state.detail);

    return (
    <div>
        {  pokeDetail && pokeDetail.length > 0 ?
            <div>
                <div className={style.aling_img}>
                <img src = {pokeDetail[0].image ? pokeDetail[0].image : pokeDetail[0].imagen} alt="" className={style.poke_img}/>
                <h2 className={style.info}># {pokeDetail[0].id}</h2>
                <h1 className={style.info}>{pokeDetail[0].name}</h1>
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
                    <Link to='/home'>
                        <button className={style.button_back} >
                            <span className={style.button_span}>Back</span>
                        </button>
                    </Link>
                </div> : <img className={style.image_loading}
                    src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"}
                    alt=""
                />
        }
    </div> 
)};

export default Detail;