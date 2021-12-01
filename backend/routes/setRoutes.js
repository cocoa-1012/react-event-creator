const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');

const routes = [
  {
    path: '/api/auth',
    handler: authRoutes,
  },
  {
    path: '/api/event',
    handler: eventRoutes,
  },
  {
    path: '/api/user',
    handler: userRoutes,
  },
  {
    path: '/',
    handler: (req, res) => {
      return res.status(200).json({
        message: 'ok',
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((item) => {
    if (item.path === '/') {
      app.get('/', item.handler);
    } else {
      app.use(item.path, item.handler);
    }
  });
};
