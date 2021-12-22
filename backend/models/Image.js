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
  },
  height: {
    type: DataTypes.INTEGER,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

const Image = db.define('images', imageSchema);

module.exports = Image;
