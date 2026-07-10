const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
    const Programa = sequelize.define('Programa', {
        idPrograma: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caracteristica: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        requisitos: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        multimedia: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Adults"
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

};