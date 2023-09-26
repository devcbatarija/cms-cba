const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Podcast",{
        id_Podcast:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        name:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        preview_url:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        images:{
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull:false
        },
        id_song:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        state:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    })
}