const { DataTypes } = require('sequelize');
const db = require('../config/database');

const imageSchema = {
  filename: {
    type: DataTypes.STRING,
    unique: true,
  },
  event_id: {
    type: DataTypes.INTEGER,
  },
  width: {
    type: DataTypes.INTEGER,
    defaultValue: 200,
  },
  height: {
    type: DataTypes.INTEGER,
    defaultValue: 300,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

const Image = db.define('images', imageSchema);

module.exports = Image;
