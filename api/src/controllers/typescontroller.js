//Aqui ira el llamado a los pokemones por type tanto de la API como de la DB
const axios = require('axios');
const { Type } = require('../db');

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
        //En caso de no encontrarlo lo crea posicionando cada type en la columna name
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