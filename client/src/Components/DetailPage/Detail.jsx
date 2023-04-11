import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/actions";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch]);

    const pokeInfo = useSelector((state) => state.detail);
    // console.log(details)

    return (
    <div>
        {  pokeInfo.length !== 0 ? 
            <div>
                <h1>{pokeInfo.name}</h1>
            </div> : <p>Loading...</p>
        }
    </div>
)};

export default Detail;