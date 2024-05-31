const { DataTypes, UUIDV4, DATE} = require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('Notification',{
        id_Publicacion:{
            type:DataTypes.UUID,  
            primaryKey:true,
            defaultValue:UUIDV4,  
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        body:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        sound:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: 'default'
        },
        data:{
            type:DataTypes.STRING,
            allowNull:false
        }, 
        tipo:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: 'global'
        }, 
    });

}