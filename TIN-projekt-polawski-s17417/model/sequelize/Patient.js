const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Patient = sequelize.define('Patient', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idnumber: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    PatientComments: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true,
    },
});

module.exports = Patient;