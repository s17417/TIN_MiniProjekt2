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
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Pole jest wymagane'
            },
            notEmpty: {
                args: true,
                msg: 'Pole jest wymagane'
            }
        }
    },
    orderDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate :{
                args: true,
                msg: 'Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)'
            },
            isBefore:{
                args: new Date().toISOString(),
                msg: 'data nie może być z przyszłości'
            }
        }
    },
    resultDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate :{
                args: true,
                msg: 'Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)'
            },
            isBefore:{
                args: new Date().toISOString(),
                msg: 'data nie może być z przyszłości'
            },
            isBeforeOrderDate: function(resultDate) {
                if (this.orderDate && resultDate && this.orderDate > resultDate) {
                    throw new Error('Data wyniku musi być późniejsza niż zlecenia')
                }
            }
            
        }
    },
    labTest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Pole jest wymagane'
            },
            notEmpty: {
                msg: 'Pole jest wymagane'
            }
        }
    },
    status: {
        type: Sequelize.ENUM('Zwykły', 'Cito'),
        defaultValue: 'Zwykły',
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            }
        }
    },
    resultValue: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: true,
        validate: {
            isDecimal: {
                msg: 'Pole musi być liczbą'
            },
            is: {
                args:/^(\d{0,7})(([.,]\d*)|)$/,
                msg: 'musi skladac się z max 7 cyfr czesci całkowitej'
            }
        }
    },
    resultComment: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true,
    },
});

module.exports = Order;