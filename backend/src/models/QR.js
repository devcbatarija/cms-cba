const { DataTypes, UUIDV4 } = require("sequelize");
module.exports=(sequelize)=>{
    sequelize.define('QR',{
        id_QR:{
            type: DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:UUIDV4
        },
        id_Estudiante:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        cantidad_uso:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        informacion:{
            type:DataTypes.JSON,
            allowNull:true
        },
        fecha_Expiracion:{
            type:DataTypes.DATE,
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