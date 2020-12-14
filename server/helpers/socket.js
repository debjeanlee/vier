const socket = (io) => {
  io.on('connection', (socket) => {
    console.log('scoket', socket);
    console.log('scoket', socket.handshake);
    console.log('scoket', socket.handshake.query);

    socket.on('chat', (data) => {
      //   io.sockets.emit('chat', data);
    });
  });
};

module.exports = socket;
