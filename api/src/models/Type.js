//Este es mi modelo de Types

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de los types
  sequelize.define('type',{
    id: { //Sequelize tambien lo genera de manera automatica 
      type: DataTypes.INTEGER,
      autoIncrement: true, //incrementa los numeros de 1 por 1 
      allowNull: false,  //NO se permiten valores nulos para ese campo. Campo Obligatorio!
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  },
    {
      timestamps: false
    }
  );
};