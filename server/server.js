require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const passport = require('./configs/passport.config');
const socket = require('./helpers/socket');

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require('./configs/mongo.config');

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
socket(io);

app.use('/api', require('./routes/index.routes'));

app.get('*', (req, res) => {
  res.sendStatus(404);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
