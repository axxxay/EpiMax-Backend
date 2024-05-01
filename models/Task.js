const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    }
  }, {
        freezeTableName: true,
        timestamps: false,
});
  
module.exports = Task;
  
Task.associate = function(models) {
    Task.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });
};