const { internalServerError } = require('../utils/errorResponses');
const User = require('../models/User');
const deleteNoAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(parseInt(id));

    if (user.user_type === 'A') {
      return res.status(401).json({
        message: 'You are not authorized',
      });
    }

    return next();
  } catch (e) {
    internalServerError(res, e);
  }
};

module.exports = deleteNoAdmin;
