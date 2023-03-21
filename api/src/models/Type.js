//Este es mi modelo de Types

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de los types
  sequelize.define('type',{
    id: {
      // type: DataTypes.INTEGER,
      type: DataTypes.UUID, //
      defaultValue: DataTypes.UUIDV4,//Generador de ID
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