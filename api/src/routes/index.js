const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemon, getPokemonId, getPokemonidDB } = require('../funtions/functionpokemon.js')
const { getTypePokemon } = require('../funtions/functiontypes.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//GET Ruta de Los 100 pokemones que llame en controller
router.get('/pokemons', getPokemon);

//GET ID   
router.get('/pokemons/:id', getPokemonId); //De la API
router.get('/pokemons/:id', getPokemonidDB);//De la DB

//GET Por Nombre

//GET Por Types
router.get('/types', getTypePokemon); //revisar

//POST 

module.exports = router;
