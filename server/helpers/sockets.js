const socketIO = require('socket.io');

const sockets = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    socket.on('chat', (data) => {
      //   io.sockets.emit('chat', data);
    });
  });
};

module.exports = sockets;
