require('dotenv').config();

const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

require('./config/mongo.config');

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(express.json());
// app.use(cors({ origin: 'http://localhost:3000' }));

/**
 * @routes
 * all routes should start with '/api'
 */

// // app.use('/api/one', require("./routes/one.routes"));
// // app.use('/api/two', require("./routes/two.routes"));
// // app.use('/api/three', require("./routes/three.routes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
