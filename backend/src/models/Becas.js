const { DataTypes, UUIDV4, DATE} = require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('Beca',{
        id_Beca:{
            type:DataTypes.UUID,  
            primaryKey:true,
            defaultValue:UUIDV4,  
            allowNull:false
        },
        titulo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        multimedia:{
            type:DataTypes.ARRAY(DataTypes.TEXT), 
            allowNull:false
        },
        estado:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        tipo:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

}