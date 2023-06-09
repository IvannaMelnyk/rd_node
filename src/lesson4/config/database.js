const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test table', 'test table', 'test table', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
