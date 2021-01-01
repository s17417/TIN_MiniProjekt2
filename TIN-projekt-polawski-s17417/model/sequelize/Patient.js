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
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            len: {
                args: [2,60],
                msg: 'Pole powinno zawierać od 2 do 60 znaków'
            },
        }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Pole jest wymagane'
            },
            len: {
                args: [2,60],
                msg: 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
    },
    idnumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:{
            args: true,
        },
        validate:{
            len: {
                args: [11,11],
                msg: 'PESEL musi zawierać 11 znaków'
            },
            is: {
                args:/^\d+$/,
                msg: 'musi skladac się z cyfr'
            }
        }
       
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: ' pole jest wymagane'
            },
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
    PatientComments: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true,
    },
});

module.exports = Patient;