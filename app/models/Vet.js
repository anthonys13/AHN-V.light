const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Vet extends Model {};

Vet.init({

    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    descriptif: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    vet_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    traitement: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    analyse_exams: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {

    sequelize: sequelize,

    tableName: 'vet',

    timestamps: false
});

module.exports = Vet;