const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const AccountMongo = mongoose.model('Account', accountSchema);

module.exports = AccountMongo;
