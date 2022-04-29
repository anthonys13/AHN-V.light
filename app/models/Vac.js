const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Vac extends Model {};

Vac.init({

    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    nom: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rappel: {
        type: DataTypes.DATE,
        allowNull: true
    },

}, {

    sequelize: sequelize,

    tableName: 'vac',

    timestamps: false
});

module.exports = Vac;