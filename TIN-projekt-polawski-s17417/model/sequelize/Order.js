const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Order = sequelize.define('Order', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    orderDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    resultDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    labTest_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Zwykły', 'Cito'),
        defaultValue: 'Zwykły',
        allowNull: false
    },
    resultValue: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: true,
    },
    resultComment: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true,
    },
});

module.exports = Order;