const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Credencial",{
        id_Credencial:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        identificador:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        cliente_Id:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        client_Secret:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        token_Access:{
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