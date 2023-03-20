//Este es mi modelo de Pokemons

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de los pokemones
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID, //tipo de dato uuid, Generador de id
      //Se configura para generar automáticamente un UUID v4 único cuando se crea un nuevo registro.
      defaultValue: DataTypes.UUIDV4, //establece un valor predeterminado para un campo de tipo UUID 
      allowNull: false, //NO se permiten valores nulos para ese campo. Campo Obligatorio!
      primaryKey: true //Define una clave principal para un modelo
      //Si no defino explícitamente una clave principal para un modelo de Sequelize, 
      //Sequelize agregará automáticamente un id campo como clave principal.
      //Para evitar esa duplicidad o falta de orden colocamos la primarykey en true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true //Esto asegura que cada valor sea único y evita que se inserten duplicados.
    },
    imagen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false
  }
    //Sequelize agrega automáticamente los campos createdAt y updatedAt a cada modelo, 
    //utilizando el tipo de datos DataTypes.DATE.
    //Este comportamiento se puede desactivar con false
  );
};
