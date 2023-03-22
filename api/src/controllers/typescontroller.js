//Aqui ira el llamado a los pokemones por type tanto de la API como de la DB
const axios = require('axios');
const { Type } = require('../db');

// const getTypes = async () => { //Funcion asincrona 
    
// try { //manejo de errores
//     let types = await Type.findAll(); 
//     //Utiliza el modelo Type definido por Sequelize para buscar todos los tipos de Pokémon en la base de datos.
//     //findAll() devuelve una promesa que devuelve un arreglo de objetos
//     //que representan las filas que coinciden con los criterios de búsqueda
    
//     if (!types.length) { //Si la base de datos esta vacia //if(!types) types.length < 1
//         const typeDB = await axios.get('https://pokeapi.co/api/v2/type')
//         //Hace el llamado a la API por type
//         .then((r) => r.data.results); 
//         //con la funcion .then indicamos que se accede a data.results de type
        
//         //Tambien se puede usar un findOrCreate? Listo!
//         typeDB.forEach((t) => types.push(t.name));
//         //Con el forEach iteramos los nombres de types de la API y las pusheamos en nuestra base de datos
        
//         for (let i = 0; i < types.length; i++) {
//             //Con el for vamos a iterar sobre la base de datos del modelo Type
//             await Type.create({ name: types[i] });
//             //espera a que se resuelva la promesa que creara(con el metodo Create) de Sequelize
//             //en el modelo Type se crea una nueva fila en la tabla types 
//             //con el nombre de cada type en el arreglo types
//         }
//         let typesChange = await Type.findAll(); 
//         //busca todos los types en la base de datos después de los cambios realizados
//         return typesChange; //Los retorna
//     }
//         return types;//Finalmente se retornan los types tanto de la API como de la DB
// } catch (error) {
//         console.log(error);
//     }
// };

const getTypes = async () => { //Funcion asincrona
    try {
      // Buscamos todos los tipos en la base de datos
        let types = await Type.findAll();
        if (!types.length) {
        // Si la base de datos está vacía, obtenemos los tipos de la API
        const typeDB = await axios.get('https://pokeapi.co/api/v2/type')
        .then((r) => r.data.results); //Acceder a results de la data que es donde estan los types 
        // Creamos cada tipo en la base de datos con el método findOrCreate
        for (let i = 0; i < typeDB.length; i++) { //iteramos la data. results 
        await Type.findOrCreate({ where: { name: typeDB[i].name } });
        //Esperamos al modelo Type y con el metodo findOrCreate() si lo encuentra no lo crea
        //En caso de no encontrarlo lo crea posicionandao cada type en la comumna name
        }
        // Volvemos a buscar todos los tipos en la base de datos para devolverlos
        types = await Type.findAll(); //Una vez creados se vuelve a realizar la busqueda 
    }
        return types; //Los retornamos 
    } catch (error) {
      console.log(error); //En caso de Error
    }
};


module.exports = {
    getTypes
}