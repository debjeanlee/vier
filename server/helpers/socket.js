const socket = (io) => {
  io.on('connection', (socket) => {
    const channel = `session-${socket.handshake.query.sessionID}`;
    socket.join(channel);

    socket.on('chat', (data) => {
      //   io.sockets.emit('chat', data);
    });
  });
};

module.exports = socket;
