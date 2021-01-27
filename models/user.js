//const { DataTypes } = require(sequelize, DataTypes);
//const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
            passwordhash:{
                type:  DataTypes.STRING,
                allowNull: false,
            },
     })
     return User;
}