const { DataTypes } = require('sequelize');
const db = require('../config/database');

const userSchema = {
  name: {
    type: DataTypes.STRING,
  },
  login: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  last_login: {
    type: DataTypes.TIME,
  },
  user_type: {
    type: DataTypes.STRING,
    defaultValue: 'u',
  },
};

const User = db.define('user', userSchema);

module.exports = User;
