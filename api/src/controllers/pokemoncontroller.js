//Aqui ira la llamada a la API , la llamada a la DB y la concatenacion de ambos 
//y la logica para mostrar la informacion que requiero
const axios = require('axios'); //llama a axios
const { Pokemon, Type } = require('../db'); //Las relaciones de mis modelos 

//llamada con Fetch , herramienta nativa del navegador 
//Llamada con axios es una libreria, dependencia 
//Aqui estamos llamando a la API
async function getPokeApi() { //función asincrónica
  try { //manejo de errores.
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=120");
    //solicitud a la API utilizando el método axios y se almacena en la constante response
    const data = response.data;
    //se extraen los datos de la respuesta utilizando la propiedad data del objeto response 
    //y se almacenan en la constante data.
    const apiURL = await Promise.all(
      //Promise.all() para hacer múltiples solicitudes a la API en paralelo.
      data.results.map(async (result) => {
        //función map() en el array data.results para obtener una lista de las URL de cada Pokemon
        const response = await axios.get(result.url);
        //Cada Promesa en el array se crea utilizando una función asincrónica 
        //que hace una solicitud a la URL de cada Pokemon utilizando axios.get,segundo llamado pero ahora a url
        const data = response.data;
        //igualmente se extraen esos datos de la respuesta y se almacenan en data
        return { //Cuando se resuelve cada Promesa, devuelve un objeto que contiene información de cada pokemon
          id: data.id,
          name: data.name,
          image: data.sprites.other["dream_world"].front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weight: data.weight,
          types: data.types.map((typ) => typ.type.name),
        }; //todo esto se almacena en la constante apiURL 
      })
    )
    return apiURL; //Se retorna esa constante
  } catch (error) { //Si existe algun error lo muestra 
    throw error;
  };
};

//Llamada a la base de datos 
const getDBPoke = async () => { //Una constante que tiene una funcion asincrona
  try{ //manejo de errores
  const data =  (await Pokemon.findAll({ //Estamos llamando a todo lo que tengamos en nuestra tabla Pokemon
    //findAll() es un metodo de Sequelize 
    include: { //Incluyendo nuestro modelo Type
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })).map(pokemon => { ///importante
    const json = pokemon.toJSON();
    return{
      ...json,
      types: json.types.map( type => type.name)
    }
  });
  return data;
  /* Esto ayudo a eviar el error de "Objects are not valid as a React child. 
  If you meant to render a collection of children, use an array instead"
  se utiliza map para transformar un array de objetos que representan los pokemones y sus tipos. 
  Cada objeto se convierte a un objeto JSON, se copian todas sus propiedades en un nuevo objeto 
  y se transforma el array de types en un array de strings que contienen los nombres de los tipos. 
  El resultado es un nuevo array de objetos con la misma información que el array original,
  pero con una transformación en el campo types.*/
} catch(error) {
  throw error;
  }
};

//Concatenamos los datos de la API y la Base de Datos para poder visualizarlos todos  
const getAllPokemon  = async () => { //constante con funcion asincrona 
  try{ //manejo de errores
  const apiInfo = await getPokeApi(); //Guardamos la primera funcion donde esta el llamado a la API
	const dbInfo = await getDBPoke(); //Guardamos la segunda funcion del llamado a la base de datos 
	const allInfo = [...apiInfo, ...dbInfo]; //Los concatenamos con un spread operator o puede ser con .concat()
  
	return allInfo; //Los retornamos 
  }
  catch(error) {
    throw error;
  }
}

//Exportamos 
module.exports = {
  getPokeApi,
  getDBPoke,
  getAllPokemon
}
