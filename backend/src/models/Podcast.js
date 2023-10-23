const { DataTypes, UUIDV4 } = require("sequelize")


module.exports=(sequelize)=>{
    sequelize.define("Podcast",{
        id_Podcast:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:UUIDV4,
            allowNull:false
        },
        epi_number:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        title:{
            type:DataTypes.TEXT,
            allownull:false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        authors:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        url_cloudfront:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        image:{
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