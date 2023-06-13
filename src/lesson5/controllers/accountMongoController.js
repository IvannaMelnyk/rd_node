const AccountMongo = require('../models/accountMongo');

exports.getAccountListMongo = (req, res) => {
  AccountMongo.find()
    .then((accounts) => res.json(accounts))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.createAccountMongo = (req, res) => {
  const { username, password, role } = req.body;
  const account = new AccountMongo({ username, password, role });
  account.save()
    .then((createdAccount) => res.status(201).json(createdAccount))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.updateAccountMongo = (req, res) => {
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

exports.deleteAccountMongo = (req, res) => {
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
