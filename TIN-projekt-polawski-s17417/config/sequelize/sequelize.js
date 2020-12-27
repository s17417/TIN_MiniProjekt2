const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-s17417-sequelize', 'root', 'root', {
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    host: 'localhost'
});

module.exports = sequelize;