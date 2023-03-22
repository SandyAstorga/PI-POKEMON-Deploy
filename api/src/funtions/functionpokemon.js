const { getAllPokemon } = require("../controllers/pokemoncontroller.js");
const { Pokemon, Type } = require("../db");
const axios = require("axios");

//Funcion donde estan concatenados todos mis datos tanto de la API como de la base de datos
const getPokemons = async (req, res) => {
    try {
        const allPokemon = await getAllPokemon(); //Esperamos por la funcion
        res.status(200).json(allPokemon); //Si todo esta ok muestra todos los pokemones
    } catch (error) {
        return res.status(404).json({ message: error.message });
        //Si existe algun error mostrar el mensaje de error
    }
};

//Funcion para traer a los pokemon por ID de la api //Opcion 1...
// const getPokemonIdApi = async (req, res) => { //Funcion Asincrona
//     try { //Manejo de errores
//         const { idPokemon } = req.params; //Definimos ID correspondiente a Params
//         const pokemonSearch = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
//         //Hacemos el llamado a la API por ID
//             let data = pokemonSearch.data;
//             //Guardanos en data el resultado del llamado e ingresar a esa data (esto para axios)
//             const pokeInfo = {//Guardamos en una variable los datos que queremos mostrar
//                 id: data.id,
//                 name: data.name,
//                 image: data.sprites.other["official-artwork"].front_default,
//                 hp: data.stats[0].base_stat,
//                 attack: data.stats[1].base_stat,
//                 defense: data.stats[2].base_stat,
//                 speed: data.stats[5].base_stat,
//                 height: data.height,
//                 weight: data.weight,
//                 types: data.types.map((typ) => {return { name: typ.type.name}}),
//             };
//             return res.status(200).json(pokeInfo); //Respuesta OK mostrar la info
//             }
//     catch (error) {
//         return res.status(404).json('Pokemon no encontrado')
//         //De lo contrario mostrar el sig. mensaje
//     }
// };

//Funcion para traer Pokemons por ID y por NAME de la POKEAPI
const getPokemonsApi = async (id, name) => {
    //Funcion asincrona que devuelve una promesa
    //Recibe por parametros ID y Name
    try {
        //Manejo deerrores
        // const { id } = req.params;
        // const { name } = req.query;
        const pokemonSearch = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        //guardamos en una constante el resultado de axios por id a la API

        if (name) {
            // name = name.toLowerCase();
            //Si tenemos el parametro name se hace tro llamado pero ahora por nombra a la API
            //Se guarda en la constante pokemonSearch
            pokemonSearch = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
        }

        if (pokemonSearch) {
            //Con este if verificamos si la constante tiene algun valos ya sea por ID o por Name
            let data = pokemonSearch.data;
            //En esta variable guarda el resultado de pokemonSearh y accede a la data

            return {
                //retorna el objeto con la info que requiero
                id: data.id,
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map((typ) =>  typ.type.name),
            };
        } else {
            throw new Error("Error"); //Si algo sale mal en el if lanza un error
        }
    } catch (error) {
        console.log(error); //Si hay algun error dentro del bloque Try, el chatch nos muestra error
    }
};

//Funcion para traer Pokemons por ID y por NAME de la DB 
const getPokemonsDB = async (id, name) => {
    //Funcion asincrona que devuelve una promesa
    //Recibe por parametros ID y Name
    try { //Manejo de errores para que no rompa 
        if (name) { //Si tenemos el parametro name
            // name = name.toLowerCase();
            const searchPokemon = await Pokemon.findOne({ 
                //Creamos una constante donde se realizara la busqueda en la base de datos de mi modelo Pokemon
                //Lo que hace el metodo findOne() de Sequelize es que obtiene la primera entrada que encuentra
                //Con las propiedades especificadas  
                where: { //Donde 
                    name: name, //tengamos name y coincida 
                },
                include: { //E incluya los atributos name del Modelo Type 
                    attributes: ["name"],
                    model: Type,
                },
            });
            return searchPokemon; //Una ves hecho esto retorna esa constante 
        }

        if (id) { //Si tenemos el parametro Id
            const searchPokemon = await Pokemon.findOne({
                //Creamos una constante donde se realizara la busqueda en la base de datos de mi modelo Pokemon
                //Lo que hace el metodo findOne() de Sequelize es que obtiene la primera entrada que encuentra
                //Con las propiedades especificadas  
                where: { //Donde 
                    id: id, //id coincida con id
                },
                include: { //E incluya los atributos name del Modelo Type 
                    attributes: ["name"],
                    model: Type,
                },
            });
            return searchPokemon; //Una ves hecho esto retorna esa constante 
        }
    } catch (error) { //En caso de error lo muestra 
        console.log(error);
    }
};

//Funcion buscar Pokemons por ID en Api y DB (AMBOS)
const getPokemonsId = async (req, res) => { //Funcion asincrona
    const { idPokemon } = req.params; //Metodo parametro por ID params , dinamico
    const pokemonByApi = await getPokemonsApi(idPokemon); 
    //Guardamos en una constante la espera a la llamada de la funcion getPokemonsApi(De la POKEAPI) y le pasamos el parametro Id
    const pokemonByDB = await getPokemonsDB(idPokemon);
    //Guardamos en una constante la espera a la llamada de la funcion getPokemonsDB(De la DB) y le pasamos el parametro Id

    if (pokemonByApi) { //En la condicional if decimos que si tenemos el id de la Api
        res.status(200).json(pokemonByApi); //Nos de un estatus 200 con el json de ese pokemon
    }
    if (pokemonByDB) { //En la condicional if decimos que si tenemos el id de la DB
        res.status(200).json(pokemonByDB); //Nos de un estatus 200 con el json de ese pokemon
    }
    if (!pokemonByApi && !pokemonByDB) { //En caso de no tener id de la POKEAPI ni de mi DB 
        res.status(400).send(`Pokemon ${idPokemon} no encontrado`); //Lanza un status 400 con el mensaje de que no se encontro
    }//send o json? 
};

//Funcion buscar pokemons por NAME en la Api y en la DB (AMBOS)
const getPokemonsName = async (req, res) => { //Funcion asincronica
    try { //Manejo de errores 
        const { name } = req.query; //Metodo parametro Name por query
        if (name) { //En la condicional si tenemos name 
            // name = name.toLowerCase();
            const pokemonByApi = await getPokemonsApi(name);
        //Guardamos en una constante la espera a la llamada de la funcion getPokemonsApi(De la POKEAPI) y le pasamos el parametro name
            const pokemonByDB = await getPokemonsDB(name); //undefined, name?
        //Guardamos en una constante la espera a la llamada de la funcion getPokemonsDB(De la DB) y le pasamos el parametro name
            if (pokemonByApi) { //En la condicional if decimos que si tenemos el name de la Api
                res.status(200).json(pokemonByApi);//Nos de un estatus 200 con el json de ese pokemon
            }
            if (pokemonByDB) { //En la condicional if decimos que si tenemos el name de la DB
                res.status(200).json(pokemonByDB); //Nos de un estatus 200 con el json de ese pokemon
            }
            if (!pokemonByApi && !pokemonByDB) { //En caso de no tener name de la POKEAPI ni de mi DB 
                res.status(400).json(`Pokemon ${name} no encontrado`);//Lanza un status 400 con el mensaje de que no se encontro
            }  //json o send?
        }
        if (!name) {//En el caso de que no tenga name 
            let pokes = await getAllPokemon();//Va a esperar por la funcion que trae a todos mis pokemones tanto de la API como de la DB
            res.status(200).json(pokes); //Los muestra
        }
    } catch (error) {
        console.log(error); //En caso de error
    }
};

//Funcion para Crear un pokemon pendiente
const postPokemon = async (req, res) => { //Funcion asincrona
    try { //Manejo de Errores
        const { name, types, image, attack, weight, height, hp, speed, defense } = req.body;
        //destructuración para extraer las propiedades que se solicitaran al usuario

        const createPoke = await Pokemon.create({ 
            //Crea un nuevo registo en la DB del modelo Pokemon 
            name,
            // types,
            image,
            attack,
            weight,
            height,
            hp,
            speed,
            defense,
        });

        const pokemonTypes = await Type.findOne({
            //En esta variable esperamos por el modelo Type a que encuentre 
            //un registro donde el nombre es igual al valor de la variable name
            where: { name: types },//type
        });

        createPoke.addType(pokemonTypes);
        //Al registro creado de agraga el valor type del los modelos en la DB
        return res.status(200).send("Felicidades!! Has creado a tu Pokemon");
    } catch (error) {
        res.status(400).json('Error al crear Pokemon');
    }
};

module.exports = {
    getPokemons,
    getPokemonsName,
    getPokemonsId,
    postPokemon
};
