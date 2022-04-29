const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Animals extends Model {};

Animals.init({

    nom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    poids: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    age: {
        type: DataTypes.DATE,
        allowNull: false
    },
    race: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "default-animal.png",
    },

}, {

    sequelize: sequelize,

    tableName: 'animals',

    timestamps: false
});

module.exports = Animals;