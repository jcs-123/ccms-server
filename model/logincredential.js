// models/logincredential.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  role: String,
});

const logincredential = mongoose.model('logincredential', loginSchema);
module.exports = logincredential;
