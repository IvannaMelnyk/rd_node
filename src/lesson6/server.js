const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accounts');
const tokenRoutes = require('./routes/tokens');
const sequelize = require('./config/database');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(bodyParser.json());
app.use('/accounts', accountRoutes);
app.use('/tokens', tokenRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Підключено до MongoDB');
  })
  .catch((error) => {
    console.error('Помилка підключення до MongoDB:', error);
  });
  
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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Немає доступу. Токен не надано.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: 'Немає доступу. Токен недійсний.' });
    }
    req.user = user;
    next();
  });
};
const validateAccountCreation = [
  body('username').notEmpty().withMessage('Ім\'я користувача є обов\'язковим.'),
  body('password').notEmpty().withMessage('Пароль є обов\'язковим.'),
  body('role').notEmpty().withMessage('Роль є обов\'язковою.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

app.get('/accounts', authenticateToken, accountController.getAccountList);
app.post('/accounts', authenticateToken, validateAccountCreation, accountController.createAccount);
app.put('/accounts/:id', authenticateToken, accountController.updateAccount);
app.delete('/accounts/:id', authenticateToken, accountController.deleteAccount);

app.get('/tokens', authenticateToken, tokenController.getTokenList);
app.get('/tokens/:accountId', authenticateToken, tokenController.getAccountTokenList);
app.post('/tokens', authenticateToken, tokenController.createToken);
app.put('/tokens/:id', authenticateToken, tokenController.updateToken);
app.delete('/tokens/:id', authenticateToken, tokenController.deleteToken);

module.exports = server;

