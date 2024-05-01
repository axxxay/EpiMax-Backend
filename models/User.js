const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define('users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
  }, {
        freezeTableName: true,
        timestamps: false,
  });
  
  module.exports = User;
  