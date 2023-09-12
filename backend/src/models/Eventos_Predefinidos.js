const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Evento_Predefinido",{
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey:true,
            defaultValue: UUIDV4
        },
        title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        color:{
            type: DataTypes.STRING,
            allowNull:false
        },
        state:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        },
        tipo:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}