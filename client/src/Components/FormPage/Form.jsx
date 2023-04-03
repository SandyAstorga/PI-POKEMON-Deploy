import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypePokemon, postPokemon } from "../../Redux/actions";

import validate from "./validation";

const Form = () => {
const dispatch = useDispatch();
const types = useSelector((state) => state.types);

    const [ form, setForm ] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    weight: "",
    height: "",
    speed: "",
    types: [],
    });

    useEffect(() => { //Despacha los types 
        dispatch(getTypePokemon());
    },[dispatch])

    
    const changeHandler = (event) =>{ //Guarda lo que se escribe en el input 
        const property = event.target.name;
        const value = event.target.value;
        setForm({
            ...form,
            [property]:value});
        validate({
            ...form,
            [property]:value});
    };

    const submitHandler = (e) => { 
        // Evita que recargue la pagina al dar click en submit
        e.preventDefault();
        dispatch(postPokemon(form));
        alert("Personaje creado con exito");
        setForm({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            weight: "",
            height: "",
            speed: "",
            types: [],
        });
    }

    const handlerSelect = (e) => { //Muestra los types que selecciona el usuario para que vea los que eligio
        setForm({
            ...form,
            types: [...form.types, e.target.value],
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <h1>
                Create your Pokemon!
            </h1>
            <div>
                <label>Name: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name"/>
            </div>
            <div>
                <label>Image: </label>
                <input type="text" value={form.image} onChange={changeHandler} name="image"/>
            </div>
            <div>
                <label>Life: </label>
                <input type="text" value={form.hp} onChange={changeHandler} name="hp"/>
            </div>
            <div>
                <label>Attack: </label>
                <input type="text" value={form.attack} onChange={changeHandler} name="attack"/>
            </div>
            <div>
                <label>Defense: </label>
                <input type="text" value={form.defense} onChange={changeHandler} name="defense"/>
            </div>
            <div>
                <label>Speed: </label>
                <input type="text" value={form.speed} onChange={changeHandler} name="speed"/>
            </div>
            <div>
                <label>Weight: </label>
                <input type="text" value={form.weight} onChange={changeHandler} name="weight"/>
            </div>
            <div>
                <label>Height: </label>
                <input type="text" value={form.height} onChange={changeHandler} name="height"/>
            </div>
                <label>Type: </label>
            {/* <p className="types"> */}
                <select className="types" onChange={handlerSelect}>
                {/* <option value="typespoke">Select</option> */}
                    {types?.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                    <li>{form.types.map((type) => type + " , ")}</li>
            {/* </p> */}
            <button>Submit</button>
        </form>
    )
}

export default Form;

