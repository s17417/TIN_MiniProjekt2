

const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const authUtil = require('../../util/authUtils');


const LoggedUser = sequelize.define('LoggedUser', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },

    isAdmin:{
        type: Sequelize.TINYINT(1),
        allowNull: false,
        unique: false,
        defaultValue: false
    },
    
    password: {
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
        },
        
    },

    password1: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Pole jest wymagane'
            },
            len: {
                args: [2,60],
                msg: 'Pole powinno zawierać od 2 do 60 znaków'
            },

            isEqual: function(pw) {
                if (this.password != pw) {
                    throw new Error('Hasła nie są identyczne');
                }
            }
        },
        
    },
},
{
    hooks:{
        beforeBulkCreate: (users,options) => {
            for (const user of users) {
                user.password=authUtil.hashPassword(user.password);
                user.password1=authUtil.hashPassword(user.password1);
            }
        },
        
        beforeSave: (user,options) => {
            user.password=authUtil.hashPassword(user.password);
        }
    }
}

);
module.exports = LoggedUser;