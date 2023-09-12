const { DataTypes, UUIDV4 } = require("sequelize");
module.exports=(sequelize)=> {
    sequelize.define('Programa', {
        id_Programa: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modalidad:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
    });
}