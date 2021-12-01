const isAdmin = (req, res, next) => {
  if (req.user.user_type === 'A') {
    return next();
  }

  return res.status(401).json({
    message: 'Unauthorized!',
  });
};

module.exports = isAdmin;
