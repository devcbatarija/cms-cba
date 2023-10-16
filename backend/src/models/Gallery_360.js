const { DataTypes, UUIDV4 } = require("sequelize")

module.exports=(sequelize)=>{
    sequelize.define("Gallery",{
        id_gallery:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        image:{
            type: DataTypes.TEXT,
            allowNull:false
        }
    })
}