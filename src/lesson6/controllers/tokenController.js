const Token = require('../models/token');

exports.getTokenList = (req, res) => {
  Token.findAll()
    .then((tokens) => res.render('tokens', { tokens }))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.createToken = (req, res) => {
  const { name, token } = req.body;
  Token.create({ name, token })
    .then((createdToken) => res.status(201).json(createdToken))
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.updateToken = (req, res) => {
  const { id } = req.params;
  const { name, token } = req.body;
  Token.update({ name, token }, { where: { id } })
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({ error: 'Токен не знайдено' });
      }
      res.json({ message: 'Токен оновлено' });
    })
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};

exports.deleteToken = (req, res) => {
  const { id } = req.params;
  Token.destroy({ where: { id } })
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ error: 'Токен не знайдено' });
      }
      res.json({ message: 'Токен видалено' });
    })
    .catch((error) => res.status(500).json({ error: 'Помилка сервера' }));
};
