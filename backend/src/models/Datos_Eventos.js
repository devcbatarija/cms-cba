const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Dato_Evento",{
        id_Evento:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        multimedia:{
            type:DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        },
        categoria:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}