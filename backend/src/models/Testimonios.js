const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Testimonios",{
        id_Testimonios:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        nombre:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        apellidos:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        cargo:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        comentario:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        imagen:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        state:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    })
}