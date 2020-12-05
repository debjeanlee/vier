const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

app.use('/', express.static('dist'));

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
