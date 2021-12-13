const { DataTypes } = require('sequelize');
const db = require('../config/database');

const userSchema = {
  name: {
    type: DataTypes.STRING,
  },
  username: {
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
    defaultValue: 'U',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isPassReset: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

const User = db.define('user', userSchema);

module.exports = User;
