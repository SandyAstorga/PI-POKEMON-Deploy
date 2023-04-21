const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemons, postPokemon, idPokemon } = require('../funtions/functionpokemon.js')
const { getTypePokemon } = require('../funtions/functiontypes.js')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET Ruta para el llamado de los pokemons de la API y de la DB
router.get('/pokemons', getPokemons); //Lista Todos los pokemon y por name pokemons?name=

//GET Por Types
router.get('/types', getTypePokemon); //Lista

//POST Crear
router.post('/pokemons', postPokemon);//Lista

//GET Por ID de Api y DB
router.get('/pokemons/:id', idPokemon ); //OK


module.exports = router;
