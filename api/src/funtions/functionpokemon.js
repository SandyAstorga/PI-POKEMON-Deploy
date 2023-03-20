const { getAllPokemon } = require('../controllers/pokemoncontroller.js');
const { Pokemon, Type} = require('../db')
const axios = require('axios');

//Funcion donde estan concatenados todos mis datos tanto de la API como de la base de datos 
const getPokemon = async (req, res) => {
    try {
        const allPokemon = await getAllPokemon(); //Esperamos por la funcion
        res.status(200).json(allPokemon);//Si todo esta ok muestra todos los pokemones
    } catch (error) {
        return res.status(404).json({ message: error.message })
        //Si existe algun error mostrar el mensaje de error
    } 
}

//Funcion para traer a los pokemon por ID de la API
const getPokemonId = async (req, res) => { //Funcion Asincrona
    try { //Manejo de errores 
        const { id } = req.params; //Definimos ID correspondiente a Params
        const idPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //Hacemos el llamado a la API por ID

        if(idPokemon){ //Si la data nos llega 
            const data = idPokemon.data; 
            //Guardanos en data el resultado del llamado e ingresar a esa data (esto para axios)

            const pokeInfo = {//Guardamos en una variable los datos que queremos mostrar
                id: data.id,
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map((typ) => typ.type.name),
            };
            return res.status(200).json(pokeInfo); //Respuesta OK mostrar la info 
        }
    } catch (error) {
        return res.status(404).json('Pokemon no encontrado') 
        //De lo contrario mostrar el sig. mensaje 
    }
};

//Funcion para traer el pokemon buscandolo por ID en nuestra base de datos
const getPokemonidDB = async (id) => { //Funcion asincronica que acepta un paramatro por ID
    try { //Manejo de errores
        if (id) { //Si ID es verdadero 
        const idDBPokemon = await Pokemon.findOne({ 
        // Definimos la constante que tendra guardada una Promesa 
        //Que buscara en el Modelo Pokemon con ayuda del metodo findOne() de sequelize
        //Buscara una fila en la Base de Datos que coincida con los criterios de busqueda
            where: { //Especifica los criterios de busqueda 
            id: id,
        },
            include: { //Especifica que se deben inclur los detalles de Type del Pokemon
            attributes: ["name"], //El nombre de Type
            model: Type, //Del modelo Type
        },
        });
        return idDBPokemon; //Retorna la respuesta 
        }
    } catch (error) {
        return res.status(404).json('Pokemon no encontrado') //En caso de error
    }
};

//Funcion para buscar pokemons por name 



module.exports ={
    getPokemon,
    getPokemonId,
    getPokemonidDB
}