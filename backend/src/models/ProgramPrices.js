const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('ProgramPrices', {
        id_Programa: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        },
        columns: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false
        },
        rows: {
            type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.TEXT)),
            allowNull: false
        }
    });
}