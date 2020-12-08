require('dotenv').config();

const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

require('./config/mongo.config');

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(express.json());

/**
 * @routes
 * all routes should start with '/api'
 */

// categories
app.use('/api/categories', require('./routes/categories.routes'));
// dishes
app.use('/api/dishes', require('./routes/dishes.routes'));

app.get('*', (req, res) => {
  res.sendStatus(404);
});

// // app.use('/api/one', require("./routes/one.routes"));
// // app.use('/api/two', require("./routes/two.routes"));
// // app.use('/api/three', require("./routes/three.routes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
