const { DataTypes } = require('sequelize');
const db = require('../config/database');

const eventSchema = {
  name: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    default: null,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    default: null,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    default: null,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  owner: {
    type: DataTypes.STRING,
    default: null,
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.STRING,
    default: null,
    allowNull: true,
  },
  ticket_price: {
    type: DataTypes.INTEGER,
  },
  date_from: {
    type: DataTypes.STRING,
  },
  date_to: {
    type: DataTypes.STRING,
    default: null,
    allowNull: true,
  },
  time_from: {
    type: DataTypes.STRING,
  },
  time_to: {
    type: DataTypes.STRING,
  },
  timezone: {
    type: DataTypes.STRING,
  },
  source_url: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
    default: null,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    default: 0,
  },
};

const Event = db.define('events', eventSchema);

module.exports = Event;
