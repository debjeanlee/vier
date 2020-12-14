const socket = (io) => {
  io.on('connection', (socket) => {
    const channel = `session-${socket.handshake.query.sessionID}`;
    socket.join(channel);

    socket.on('cart', (data) => {
      socket.to(channel).emit('cart');
    });
  });
};

module.exports = socket;
