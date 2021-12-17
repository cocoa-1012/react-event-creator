const { body } = require('express-validator');

const validation = {
  eventCreateValidator: [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Event name required!')
      .isLength({ min: 4, max: 50 })
      .withMessage('Name must a char between 4 to 50')
      .custom((_, { req }) => {
        req.body.created_by = req.user.id;
        return true;
      }),
    body('description')
      .not()
      .isEmpty()
      .withMessage('Event description is required!'),

    body('date_from')
      .not()
      .isEmpty()
      .withMessage('Event date from is required!'),
    body('time_from').custom((_, { req }) => {
      if (!req.body.date_to) {
        throw Error('Time from is required');
      }
      return true;
    }),
    body('time_to').custom((_, { req }) => {
      if (!req.body.date_to) {
        throw Error('Time to is required');
      }
      return true;
    }),

    body('source_url').not().isEmpty().withMessage('Source URL is required!'),
  ],
};

module.exports = validation;
