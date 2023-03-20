//Aqui ira el llamado a los pokemones por type tanto de la API como de la DB
const axios = require('axios');
const { Type } = require('../db');

const getTypes = async () => { //Funcion asincrona 
    
try { //manejo de errores
    let types = await Type.findAll(); 
    //Utiliza el modelo Type definido por Sequelize para buscar todos los tipos de Pokémon en la base de datos.
    //findAll() devuelve una promesa que devuelve un arreglo de objetos
    //que representan las filas que coinciden con los criterios de búsqueda
    
    if (!types.length) { //Si la base de datos esta vacia //if(!types) types.length < 1
        const typeDB = await axios.get('https://pokeapi.co/api/v2/type')
        //Hce el llamado a la API por type
        .then((r) => r.data.results); 
        //con la funcion .then indicamos que se accede a data.results de type
        
        //Tambien se puede usar un findOrCreate?
        typeDB.forEach((t) => types.push(t.name));
        //Con el forEach iteramos los nombres de types de la API y las pusheamos en nuestra base de datos
        
        for (let i = 0; i < types.length; i++) {
            //Con el for vamos a iterar sobre la base de datos del modelo Type
            await Type.create({ name: types[i] });
            //espera a que se resuelva la promesa que creara(con el metodo Create) 
            //en el modelo Type se crea una nueva fila en la tabla types 
            //con el nombre de cada type en el arreglo types
        }
        let typesChange = await Type.findAll(); 
        //busca todos los types en la base de datos después de los cambios realizados
        return typesChange; //Los retorna
    }
        return types;//Finalmente se retornan los types tanto de la API como de la DB
} catch (error) {
        console.log(error);
    }
};


module.exports = {
    getTypes
}