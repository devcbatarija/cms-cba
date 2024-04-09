const { DataTypes, UUIDV4 } = require("sequelize");
module.exports=(sequelize)=>{
    sequelize.define('Consigna_Evento',{
        id_Consigna:{
            type: DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:UUIDV4
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        cantidad_Referidos:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        top:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nota_Asignada:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        estado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        },
    }
    );
}