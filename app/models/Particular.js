const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Particular extends Model {};

Particular.init({

    nom: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descriptif: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {

    sequelize: sequelize,

    tableName: 'particular',

    timestamps: false
});

module.exports = Particular;