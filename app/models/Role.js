const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Role extends Model {};

Role.init({

    role: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "user",
    },

}, {

    sequelize: sequelize,

    tableName: 'role',

    timestamps: false
});

module.exports = Role;