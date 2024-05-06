const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("QR", {
    id_QR: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    id_Estudiante: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nombre_estudiante: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paralelo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mes_literal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gestion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    inicio_modulo:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    fin_modulo:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    profesor:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    horario:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    turno:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    modulo:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cantidad_uso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_Expiracion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora_expiracion:{
      type: DataTypes.TIME,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
