const { internalServerError } = require('../utils/errorResponses');
const Event = require('../models/Event');

const controller = {
  create: async (req, res) => {
    try {
      const {
        name,
        address,
        city,
        country,
        description,
        owner,
        coordinates,
        ticket_price,
        date_from,
        date_to,
        time_from,
        time_to,
        source_url,
        rating,
        created_by,
        timezone,
      } = req.body;

      const data = {
        name,
        address: address || null,
        city: city || null,
        country: country || null,
        description,
        owner: owner || null,
        coordinates: coordinates || null,
        ticket_price: ticket_price || null,
        date_from: date_from,
        date_to: date_to || null,
        time_from: time_from || null,
        time_to: time_to || null,
        source_url,
        rating: rating || null,
        created_by,
        timezone: timezone || null,
      };

      const event = await Event.create(data);
      return res.status(201).json(event);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  getAll: async (req, res) => {
    try {
      let data;
      if (req.user.user_type === 'A') {
        data = await Event.findAll({
          where: { isDeleted: 0 },
          attributes: { exclude: ['isDeleted', 'updatedAt'] },
        });
      } else {
        data = await Event.findAll({
          where: { created_by: req.user.id, isDeleted: 0 },
          attributes: { exclude: ['isDeleted', 'updatedAt'] },
        });
      }
      return res.status(200).json(data);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  find: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({
        where: { id, isDeleted: false },
        attributes: { exclude: ['isDeleted', 'updatedAt'] },
      });

      if (req.user.user_type !== 'A' && event.created_by !== req.user.id) {
        return res.status(401).json({
          message: 'You are not authorized!',
        });
      }
      const eventData = event.dataValues;

      Object.entries(eventData).forEach(([option, value]) => {
        if (!value || value === null || value === 'null') {
          delete eventData[option];
        }
      });
      return res.status(200).json(eventData);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const eventFind = await Event.findByPk(id);
      if (req.user.user_type !== 'A' && eventFind.created_by !== req.user.id) {
        return res.status(401).json({
          message: 'You are not authorized!',
        });
      }

      const {
        name,
        address,
        city,
        country,
        description,
        owner,
        coordinates,
        ticket_price,
        date_from,
        date_to,
        time_from,
        time_to,
        source_url,
        rating,
        created_by,
        timezone,
      } = req.body;

      const data = {
        name,
        address: address || null,
        city: city || null,
        country: country || null,
        description,
        owner: owner || null,
        coordinates: coordinates || null,
        ticket_price: ticket_price || null,
        date_from: date_from,
        date_to: date_to || null,
        time_from: time_from || null,
        time_to: time_to || null,
        source_url,
        rating: rating || null,
        created_by,
        timezone: timezone || null,
      };

      await Event.update(data, { where: { id } });
      const event = await Event.findByPk(id);
      return res.status(200).json(event);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;

      const eventFind = await Event.findByPk(id);
      if (req.user.user_type !== 'A' && eventFind.created_by !== req.user.id) {
        return res.status(401).json({
          message: 'You are not authorized!',
        });
      }

      await Event.update({ isDeleted: 1 }, { where: { id } });
      return res.status(200).json({ message: 'Event deleted successfully!' });
    } catch (e) {
      internalServerError(res, e);
    }
  },
};

module.exports = controller;
