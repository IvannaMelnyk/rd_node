const Account = require('../models/account');
const Token = require('../models/token');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');

exports.getAccountList = (req, res) => {
  Account.findAll()
    .then((accounts) => res.render('accounts', { accounts }))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.createAccount = (req, res) => {
  const { username, password, role } = req.body;
  Account.create({ username, password, role })
    .then((account) => res.status(201).json(account))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.updateAccount = (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  Account.update({ username, password, role }, { where: { id } })
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({ error: 'Обліковий запис не знайдено' });
      }
      res.json({ message: 'Запис оновлено' });
    })
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.deleteAccount = (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  if (role !== 'admin') {
    return res.status(403).json({ error: 'Доступ заборонено' });
  }
  Account.destroy({ where: { id } })
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ error: 'Обліковий запис не знайдено' });
      }
      res.json({ message: 'Запис видалено' });
    })
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.getAccountTokens = (req, res) => {
  const { id } = req.params;
  Token.findAll({ where: { accountId: id } })
    .then((tokens) => res.render('tokens', { tokens }))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET);
  res.json({ token });
};
