const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Fecha_Lectura", {
        id_fecha_lectura: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false
        },
        dia: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        año:{
            type: DataTypes.STRING,
            allowNull: true
        },
        hora:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}