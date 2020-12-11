require('dotenv').config();
const express = require('express');
const http = require('http');
const passport = require('./configs/passport.config');
const sockets = require('./helpers/sockets');

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);

require('./configs/mongo.config');

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

sockets(server);

app.use('/api', require('./routes/index.routes'));

app.get('*', (req, res) => {
  res.sendStatus(404);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
