const { getTypes } = require('../controllers/typescontroller.js');

//Funcion para mostrar por types
const getTypePokemon = async (req, res) => {
    try {
        const typePoke = await getTypes(); //Esperamos por la funcion getType
        return res.status(200).json(typePoke);//Si todo esta ok muestra los types
    } catch (error) {
        return res.status(404).json('Types no encontrados')
        //Si existe algun error mostrar el mensaje de error
    } 
}

module.exports = {
    getTypePokemon
}