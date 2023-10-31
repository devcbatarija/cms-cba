const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("PreRegistro", {
    id_Registro: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_Nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ci: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
