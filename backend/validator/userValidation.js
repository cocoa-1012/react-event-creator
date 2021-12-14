const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = {
  userRegisterValidator: [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Please enter a name')
      .isLength({ min: 4, max: 50 })
      .withMessage('Please enter a name between 4 to 50 chars')
      .trim(),
    body('username')
      .not()
      .isEmpty()
      .withMessage('Please enter a username')
      .custom(async (username, { req }) => {
        const userData = await User.findOne({ where: { username } });

        if (!userData) {
          return true;
        }

        if (!userData.isDeleted) {
          throw new Error('Username is already exists!');
        }

        req.prevUserUsername = true;
        return true;
      }),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .custom(async (email, { req }) => {
        if (req.prevUserUsername) {
          return true;
        }
        const userData = await User.findOne({ where: { email } });

        if (!userData) {
          return true;
        }

        if (!userData.isDeleted) {
          throw new Error('Email is already exists!');
        }

        req.prevUserEmail = true;
        return true;
      })
      .normalizeEmail(),
  ],
  userLoginValidator: [
    body('username').not().isEmpty().withMessage('Username is required!'),
    body('password').not().isEmpty().withMessage('Password is required!'),
  ],
  userNameValidator: [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Please enter a name')
      .isLength({ min: 4, max: 50 })
      .withMessage('Please enter a name between 4 to 50 chars')
      .trim(),
  ],
  userPasswordUpdateValidator: [
    body('oldPassword').not().isEmpty().withMessage('Old password is required'),
    body('newPassword')
      .not()
      .isEmpty()
      .withMessage('New password is required')
      .isLength({ min: 8, max: 32 })
      .withMessage('Old password must be chars between 8 to 32'),
    body('confirmPassword')
      .not()
      .isEmpty()
      .withMessage('Confirm password is required')
      .isLength({ min: 8, max: 32 })
      .withMessage('Confirm password must be chars between 8 to 32')
      .custom(async (confirmPassword, { req }) => {
        const { newPassword } = req.body;

        if (newPassword !== confirmPassword) {
          throw new Error("Password didn't match!");
        }

        return true;
      }),
  ],
};

module.exports = validator;
