//Aqui ira la llamada a la API , la llamada a la DB y la concatenacion de ambos 
//y la logica para mostrar la informacion que requiero
const axios = require('axios');
const { Pokemon, Type } = require('../db');

//llamada con Fetch , herramienta nativa del navegador 
// async function getPokeApi() { //Funcion que devuelve una promesa
//   try { //manejo de errores
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=80");
//     //Devuelve una Promesa que resuelve en un objeto llamado response
//     const data = await response.json();
//       //  Se utiliza el método json() en el objeto response 
//       //  para obtener los datos de la respuesta HTTP como un objeto JSON.
//     const apiURL = await Promise.all(
//       //  El método Promise.all() se utiliza para esperar a que se resuelvan todas las Promesas en el array.
//       data.results.map(async (result) => {
//       //  La función map() se utiliza para crear un nuevo array de Promesas.
//         const response = await fetch(result.url);
//       // Cada Promesa en el array se crea mediante una función asincrónica que utiliza fetch()
//       // para obtener la información de cada Pokemon.
//         const data = await response.json();
//         return { //La informacion se devuelve como un objeto 
//           id: data.id,
//           name: data.name,
//           types: data.types.map((typ) => typ.type.name),
//           image: data.sprites.other["official-artwork"].front_default,
//         };
//       })
//     );
//     return apiURL;
//   } catch (error) {
//     console.log(error);
//   };
// };

// async function getPokeApi() {
//   try {
//     const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
//     const datar = response.data;

//       const apiurls = await Promise.all(
//       datar.results.map(async (result) => {
//       const response = await axios.get(result.url);
//       return{
//         id: response.data.id,
//         name: response.data.name
//       }
//     })
//     )
//     return apiurls;
//   } catch (error) {
//     console.log(error);
//   }
// }

//Llamada con axios es una libreria, dependencia 
//Aqui estamos llamando a la API
async function getPokeApi() { //función asincrónica
  try { //manejo de errores.
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
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
          types: data.types.map((typ) => typ.type.name),
          image: data.sprites.other["official-artwork"].front_default,
        }; //todo esto se almacena en la constante apiURL 
      })
    )
    return apiURL; //Se retorna esa constante
  } catch (error) { //Si existe algun error lo muestra 
    console.log(error);
  };
};



//Llamada a la base de datos 
const getDBPoke = async () => { //Una constante que tiene una funcion asincrona
  try{ //manejo de errores
  return await Pokemon.findAll({ //Estamos llamando a todo lo que tengamos en nuestra tabla Pokemon
    //findAll() es un metodo de Sequelize 
    include: { //Incluyendo nuestro modelo Type
      attributes: ["name"],
      model: Type,
      through: {
        attributes: [],
      },
    },
  });
} catch{
  console.log(error);
  }
};

//Concatenamos los datos de la API y la Base de Datos para poder visualizarlos todos  
const getAllPokemon  = async () => { //constante con funcion asincrona 
  try{ //manejo de errores
  const apiInfo = await getPokeApi(); //Guardamos la primera funcion donde esta el llamado a la API
	const dbInfo = await getDBPoke(); //Guardamos la segunda funcion del llamado a la base de datos 
	const allInfo = [...apiInfo, ...dbInfo]; //Los concatenamos con un spread operator
  
	return allInfo; //Los retornamos 
  }
  catch{
    console.log(error);
  }
}


//Exportamos 
module.exports = {
  getPokeApi,
  getDBPoke,
  getAllPokemon
}
