const { getAllPokemon } = require("../controllers/pokemoncontroller.js");
const { Pokemon, Type } = require("../db");
const axios = require("axios");

//Funcion donde estan concatenados todos mis datos tanto de la API como de la base de datos
//Busca por name tambien
const getPokemons = async (req, res) => { 
    const { name } = req.query 
    let pokemonsAll = await getAllPokemon(); 
    if(name){
        let pokemonName = pokemonsAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) 
        pokemonName.length ? 
        res.status(200).send(pokemonName) :
        res.status(400).send("Pokemon no encontrado :(")
    } else {
        res.status(200).send(pokemonsAll)
    }
}

//Funcion para Crear un pokemons
const postPokemon = async (req, res) => {
    const { name, types, imagen, attack, weight, height, hp, speed, defense, createdInDb } = req.body;
    const nameLower = name.trim().toLowerCase(); 
        //Lo almaceno con minuscula en Db y elimino espacios con trim
    const typesLower = types?.map((type) => type.toLowerCase());//****
        const createPoke = await Pokemon.create({ 
            //Crea un nuevo registo en la DB del modelo Pokemon 
            name: nameLower,
            imagen,
            attack, 
            weight,
            height,
            hp,
            speed,
            defense,
            createdInDb
        });
        const pokemonTypesDb = await Type.findAll({
            //En esta variable esperamos por el modelo Type a que encuentre 
            //un registro donde el nombre es igual al nombre de type
            where: { name: typesLower },//type 
        });
        createPoke.addType(pokemonTypesDb); //add metodo de sequelize
        //Al registro creado se agraga el valor type del los modelos en la DB
        const newPokemon = await Pokemon.findOne({ 
            ///*** Me va a mostrar el pokemon que cree
            where: { name: nameLower }, 
            include: [{
                model: Type,
                attributes: ['name']
        }]
        });
        return res.status(200).send(newPokemon); 
}

//Funcion traer pokemons por ID
const idPokemon = async (req, res) => {
    const { id } = req.params;

    const allPokemons = await getAllPokemon();

    if(id){
        let pokemonid  = allPokemons.filter(p => p.id == id)
        pokemonid.length ? 
        res.status(200).json(pokemonid) :
        res.status(404).json("No se encontro el Pokemon")
    }
}

module.exports = {
    getPokemons,
    postPokemon,
    idPokemon
};
