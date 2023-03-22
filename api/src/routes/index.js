const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemons, getPokemonsName, getPokemonsId, postPokemon } = require('../funtions/functionpokemon.js')
const { getTypePokemon } = require('../funtions/functiontypes.js')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET Ruta para el llamado de los pokemons de la API y de la DB
router.get('/pokemons', getPokemons);

//GET Por ID de Api y DB
router.get('/pokemons/:idPokemon', getPokemonsId );

//GET Por Nombre de Api y DB
router.get('/pokemons/name', getPokemonsName ); //revisar tolowercase por si se ingresa name con mayuscula

//GET Por Types
router.get('/types', getTypePokemon); //revisar, los id van cambiando

//POST Crear
router.post('/pokemons', postPokemon);//Revisar...


module.exports = router;
