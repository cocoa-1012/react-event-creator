const User = require('../models/User');
const { internalServerError } = require('../utils/errorResponses');
const generate = require('../utils/passwordGenerator');
const bcrypt = require('bcrypt');
const Event = require('../models/Event');
const { sendMail } = require('../utils/mail');
const moment = require('moment');

const controller = {
  create: async (req, res) => {
    const { SALT_ROUND } = process.env;
    try {
      const { name, username, email } = req.body;
      const generatedPassword = generate();

      const salt = await bcrypt.genSalt(parseInt(SALT_ROUND));
      const hashPassword = await bcrypt.hash(generatedPassword, salt);

      if (req.prevUserUsername) {
        await User.update(
          { isDeleted: false, password: hashPassword },
          { where: { username } }
        );
        const user = await User.findOne(
          { where: { username } },
          {
            attributes: { exclude: ['isDeleted', 'updatedAt', 'password'] },
          }
        );

        sendMail(generatedPassword, req.get('host'), user.email);
        return res.status(200).json(user);
      }

      if (req.prevUserEmail) {
        await User.update(
          { isDeleted: false, password: hashPassword },
          { where: { email } }
        );
        const user = await User.findOne(
          { where: { email } },
          {
            attributes: { exclude: ['isDeleted', 'updatedAt', 'password'] },
          }
        );

        sendMail(generatedPassword, req.get('host'), user.email);
        return res.status(200).json(user);
      }

      const userData = {
        name,
        username,
        password: hashPassword,
        email,
        last_login: moment().format(),
      };

      const userSave = await User.create(userData);

      sendMail(generatedPassword, `${req.hostname}:3000`, email);

      const user = await User.findByPk(userSave.id, {
        attributes: { exclude: ['isDeleted', 'updatedAt', 'password'] },
      });

      return res.status(200).json(user);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        where: { isDeleted: false },
        attributes: { exclude: ['isDeleted', 'updatedAt', 'password'] },
      });

      return res.status(200).json(users);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await User.update({ isDeleted: true }, { where: { id } });
      await Event.update({ isDeleted: true }, { where: { created_by: id } });
      return res.status(200).json({
        message: 'User Deleted!',
      });
    } catch (e) {
      internalServerError(res, e);
    }
  },
};

module.exports = controller;
