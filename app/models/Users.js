const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Users extends Model {};

Users.init({

    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mdp: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    prenom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "default-profil.png",
    },

}, {

    sequelize: sequelize,

    tableName: 'users',

    timestamps: false
});

module.exports = Users;