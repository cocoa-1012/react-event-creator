const { validationResult } = require('express-validator');

const errors = {
  internalServerError: (res, e) => {
    console.log(e);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  },
  mailSendError: (res, e) => {
    console.log(e);
    return res.status(400).json({
      message:
        'We are failed to send a mail on this email account! Please try again!',
      isMailIssue: true,
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
