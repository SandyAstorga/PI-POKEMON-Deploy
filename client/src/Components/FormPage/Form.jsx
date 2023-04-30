import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypePokemon, postPokemon } from "../../Redux/actions";
import style from "./Form.module.css"
import validate from "./validation";

const Form = () => {
const dispatch = useDispatch();
const types = useSelector((state) => state.types);

    const [ form, setForm ] = useState({
    name: "",
    imagen: "",
    hp: "",
    attack: "",
    defense: "",
    weight: "",
    height: "",
    speed: "",
    types: [],
    });

    const [errors, setErrors] = useState({});

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
        setErrors(validate({
            ...form,
            [property]: value
        }));
    };

    const submitHandler = (e) => { 
        // Evita que recargue la pagina al dar click en submit
        e.preventDefault();
        dispatch(postPokemon(form));
        alert("Personaje creado con exito");
        setForm({
            name: "",
            imagen: "",
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
                <label className={style.labels} >Name: </label>
                <input className={style.inputs} type="text" value={form.name} onChange={changeHandler} name="name" />
                <p className={style.alert}>{errors.name}</p>
            </div>
            <div>
                <label className={style.labels}>Imagen: </label>
                <input className={style.inputs} type="text" value={form.imagen} onChange={changeHandler} name="imagen"/>
                <p className={style.alert}>{errors.imagen}</p>
            </div>
            <div>
                <label className={style.labels}>Life: </label>
                <input className={style.inputs} type="text" value={form.hp} onChange={changeHandler} name="hp"/>
                <p className={style.alert}>{errors.hp}</p>
            </div>
            <div>
                <label className={style.labels}>Attack: </label>
                <input className={style.inputs} type="text" value={form.attack} onChange={changeHandler} name="attack"/>
                <p className={style.alert}>{errors.attack}</p>
            </div>
            <div>
                <label className={style.labels}>Defense: </label>
                <input className={style.inputs} type="text" value={form.defense} onChange={changeHandler} name="defense"/>
                <p className={style.alert}>{errors.defense}</p>
            </div>
            <div>
                <label className={style.labels}>Speed: </label>
                <input className={style.inputs} type="text" value={form.speed} onChange={changeHandler} name="speed"/>
                <p className={style.alert}>{errors.speed}</p>
            </div>
            <div>
                <label className={style.labels}>Weight: </label>
                <input className={style.inputs} type="text" value={form.weight} onChange={changeHandler} name="weight"/>
                <p className={style.alert}>{errors.weight}</p>
            </div>
            <div>
                <label className={style.labels}>Height: </label>
                <input className={style.inputs} type="text" value={form.height} onChange={changeHandler} name="height"/>
                <p className={style.alert}>{errors.height}</p>
            </div>
                <label className={style.labels}>Type: </label>
            {/* <p className="types"> */}
                <select className="types" onChange={handlerSelect}>
                {/* <option value="typespoke">Select</option> */}
                    {types?.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                    <li className={style.types}>{form.types.map((type) => type + " , ")}</li>
            {/* </p> */}
            <button className={style.submit}>
                <span className={style.submit_span}>Submit</span>
            </button>
        </form>
    )
}

export default Form;

