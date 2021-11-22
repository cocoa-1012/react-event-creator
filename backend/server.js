require('dotenv').config();
const express = require('express');
const db = require('./config/database');

const app = express();

require('./middleware/setMiddleware')(app);
require('./routes/setRoutes')(app);
app.use(express.static('public'));
db.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((e) => {
    console.log('Database connection failed!', e);
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
