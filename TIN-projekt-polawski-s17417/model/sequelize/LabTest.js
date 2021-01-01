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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'pole jest wymagane'
            },
            len:{
                args: [2,60],
                msg: 'pole powinno zawierać od 2 do 60 znaków'
            }
        }
    },
    units: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'pole jest wymagane'
            },
            len:{
                args: [2,60],
                msg:  'pole powino zwierać od 2 do 60 znaków'
            }
        }
    },
});

module.exports = LabTest;