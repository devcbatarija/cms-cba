const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("StudentTokenFirebase", {
        id_student_token: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull: true
        },
        tokenFCM:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}