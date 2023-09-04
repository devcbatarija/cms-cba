const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Evento",{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        start:{
            type:DataTypes.DATE,
            allowNull:false
        },
        end:{
            type:DataTypes.DATE,
            allowNull:false
        },
        color:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        tipo:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}