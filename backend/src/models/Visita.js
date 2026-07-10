const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Visita', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ruta: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'visitas',
    timestamps: false,
  });
};