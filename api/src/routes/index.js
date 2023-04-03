const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemons, getPokemonsName, getPokemonsId, postPokemon } = require('../funtions/functionpokemon.js')
const { getTypePokemon } = require('../funtions/functiontypes.js')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET Ruta para el llamado de los pokemons de la API y de la DB
router.get('/pokemons', getPokemons); //lista

//GET Por ID de Api y DB
router.get('/pokemons/:idPokemon', getPokemonsId ); //OK

//GET Por Nombre de Api y DB
router.get('/pokemons?name=', getPokemonsName ); //revisar tolowercase por si se ingresa name con mayuscula
//No filtra por nombre en la base de datos. AHHHHH !!!!!!!!!!!!!!!!!

//GET Por Types
router.get('/types', getTypePokemon); //Lista

//POST Crear
router.post('/pokemons', postPokemon);//Lista

module.exports = router;
