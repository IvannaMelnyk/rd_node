const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Token = sequelize.define('Token', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'test table'
});

module.exports = Token;
