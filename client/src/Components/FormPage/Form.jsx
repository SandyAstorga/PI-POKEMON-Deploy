import { useState } from "react";
import validate from "./validation";

const Form = () => {

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

    const changeHandler = (event) =>{
        const property = event.target.name;
        const value = event.target.value;

        setForm({...form,[property]:value});

        validate({...form,[property]:value});
    };

    const submitHandler = (event) => { 
        // Evita que recargue la pagina al dar click en submit
        event.preventDefault()
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
            <div>
                <label>Type: </label>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default Form;