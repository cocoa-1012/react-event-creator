const { validationResult } = require('express-validator');

const errors = {
  internalServerError: (res, e) => {
    console.log(e);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  },
  validationErrorResponse: async (req, res, next) => {
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }
    return next();
  },
};

module.exports = errors;
