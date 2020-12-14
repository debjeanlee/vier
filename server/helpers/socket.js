const socket = (io) => {
  io.on('connection', (socket) => {
    let channel;

    socket.on('disconnect', () => {
      socket.disconnect();
    });

    socket.on('session', (data) => {
      channel = `session-${data.sessionID}`;
      socket.join(channel);
    });

    socket.on('cart', () => {
      socket.to(channel).emit('cart');
    });
  });
};

module.exports = socket;
