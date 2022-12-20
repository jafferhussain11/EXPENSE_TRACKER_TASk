const Sequelize = require('sequelize');


const sequelize = new Sequelize(DBusernameandpass, {

    dialect: 'mysql',
    host : 'localhost',

});

module.exports = sequelize;
