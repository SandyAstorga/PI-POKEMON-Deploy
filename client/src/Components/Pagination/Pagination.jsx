import React from "react";
import style from "./Pagination.module.css"

//Logica del paginado
export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    //La funcion tendra 3 props, los pokemons por pagina
    //Los que queremos que se renderizen, luego todos los pokemones(100)
    //y el paginado (la funcion esta en el home)

    const pageNumbers = [];
    //Array vacio

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }  // iteramos el seultado de dividir todos lso pokemones / los pokemones por pagina que queremos
    //Es decir 100 / 12  y lo rendondemos hacia arriba = 9 paginas 
    //y se iran pusheando el numero de paginas en el array 

    return ( 
        // Vamos a retornar en un div 
        <div> 
            <ul className='paginado' >
                {pageNumbers &&  
                // si existe el numero de paginas se ejecuta el metodo map 
                    pageNumbers.map(number => {
                        return (
                            // donde cada numero va a ser un boton que tendra un evennto on click
                            // donde se renderizara con la funcion paginado(en home) con el numero de pagina actual 
                            <button className={style.button_pag} onClick={() => paginado(number)}>
                                <span className={style.button_span}>{number}</span>
                            </button>
                        )
                    })}
            </ul>
        </div>
    );
}
