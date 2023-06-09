const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accounts');
const tokenRoutes = require('./routes/tokens');
const sequelize = require('./config/database');

const app = express();

app.use(bodyParser.json());
app.use('/accounts', accountRoutes);
app.use('/tokens', tokenRoutes);

const server = app.listen(3000, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Підключено до БД');
      return sequelize.sync();
    })
    .then(() => {
      console.log('Таблиці синхронізовано');
      console.log('Сервер запущений на порту 3000');
    })
    .catch((error) => {
      console.error('Помилка підключення до БД:', error);
    });
});

module.exports = server;

