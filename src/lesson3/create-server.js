const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// save accounts and tokens
let accounts = [
  { id: 1, username: 'admin', password: 'admin', role: 'Адмін' },
  { id: 2, username: 'user1', password: 'password1', role: 'Користувач' },
  { id: 3, username: 'user2', password: 'password2', role: 'Користувач' }
];

let tokens = [];

// get accounts
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// create account
app.post('/accounts', (req, res) => {
  const { username, password, role } = req.body;
  const id = accounts.length + 1;
  const newAccount = { id, username, password, role };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// change account
app.put('/accounts/:id', (req, res) => {
  const accountId = parseInt(req.params.id);
  const { username, password, role } = req.body;

  const account = accounts.find((acc) => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ error: 'Обліковий запис не знайдено' });
  }

  account.username = username;
  account.password = password;
  account.role = role;

  res.json(account);
});

// remove account
app.delete('/accounts/:id', (req, res) => {
  const accountId = parseInt(req.params.id);

  if (req.query.role !== 'Адмін') {
    return res.status(403).json({ error: 'Недостатньо прав для видалення' });
  }

  const accountIndex = accounts.findIndex((acc) => acc.id === accountId);
  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Обліковий запис не знайдено' });
  }

  const deletedAccount = accounts.splice(accountIndex, 1);
  res.json(deletedAccount);
});

// get list of accounts tokens
app.get('/accounts/:id/tokens', (req, res) => {
  const accountId = parseInt(req.params.id);
  const accountTokens = tokens.filter((token) => token.accountId === accountId);
  res.json(accountTokens);
});

// get lis of all tokens
app.get('/tokens', (req, res) => {
  res.json(tokens);
});

// create tokens
app.post('/tokens', (req, res) => {
  const { accountId } = req.body;
  const account = accounts.find((acc) => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ error: 'Обліковий запис не знайдено' });
  }

  const token = `${account.username}-token`;
  tokens.push({ accountId, token });
  res.status(201).json({ token });
});

// change token
app.put('/tokens/:accountId', (req, res) => {
  const accountId = parseInt(req.params.accountId);
  const { token } = req.body;

  const account = accounts.find((acc) => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ error: 'Обліковий запис не знайдено' });
  }

  const existingToken = tokens.find((t) => t.accountId === accountId);
  if (!existingToken) {
    return res.status(404).json({ error: 'Токен не знайдено' });
  }

  existingToken.token = token;
  res.json({ token });
});

// remove token
app.delete('/tokens/:accountId', (req, res) => {
  const accountId = parseInt(req.params.accountId);

  const tokenIndex = tokens.findIndex((t) => t.accountId === accountId);
  if (tokenIndex === -1) {
    return res.status(404).json({ error: 'Токен не знайдено' });
  }

  const deletedToken = tokens.splice(tokenIndex, 1);
  res.json(deletedToken);
});

// create HTTP-server
const server = http.createServer(app);

// run server
const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущений на порту ${port}`);
});
