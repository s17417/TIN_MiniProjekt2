const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const LabTest = sequelize.define('LabTest', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    units: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = LabTest;