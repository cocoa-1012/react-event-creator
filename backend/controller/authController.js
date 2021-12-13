const { internalServerError } = require('../utils/errorResponses');
const moment = require('moment');
const User = require('../models/User');
const generate = require('../utils/passwordGenerator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = {
  login: async (req, res) => {
    const { JWT_TOKEN_SECRET } = process.env;
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: { username, isDeleted: false },
      });
      const errorResponseMessage = {
        username: 'Username is incorrect!',
        password: 'Password is incorrect!',
      };
      if (!user) {
        return res.status(400).json(errorResponseMessage);
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json(errorResponseMessage);
      }

      const isAdmin = user.user_type !== 'A' ? false : true;
      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          iat: new Date().getTime(),
          exp: Date.now() + 1000 * 60 * 60 * 2,
          isAdmin,
        },
        JWT_TOKEN_SECRET
      );

      await User.update(
        { last_login: moment().format() },
        { where: { username } }
      );

      return res.status(200).json({
        message: 'Login was successful',
        token: `Bearer ${token}`,
      });
    } catch (e) {
      internalServerError(res, e);
    }
  },
  me: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['isDeleted', 'updatedAt', 'password'] },
      });
      return res.status(200).json(user);
    } catch (e) {
      internalServerError(res, e);
    }
  },
  updateName: async (req, res) => {
    try {
      const { name } = req.body;
      await User.update({ name }, { where: { id: req.user.id } });
      return res.status(200).json({
        message: 'User full name Updated',
      });
    } catch (e) {
      internalServerError(res, e);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      console.log({ oldPassword, newPassword, confirmPassword });
      const user = await User.findByPk(req.user.id);

      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return res.status(400).json({
          oldPassword: 'Incorrect Password',
        });
      }

      const { SALT_ROUND } = process.env;

      const salt = await bcrypt.genSalt(parseInt(SALT_ROUND));
      const password = await bcrypt.hash(newPassword, salt);

      await User.update(
        { password, isPassReset: true },
        { where: { id: req.user.id } }
      );
      return res.status(200).json({
        message: 'User password updated',
      });
    } catch (e) {
      internalServerError(res, e);
    }
  },
};

module.exports = controller;
