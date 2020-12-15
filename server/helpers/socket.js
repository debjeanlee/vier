const socket = (io) => {
  io.on('connection', (socket) => {
    const { query } = socket.handshake;
    let channel;

    // For service and kitchen crews only
    if (query.clientType !== 'null') {
      channel = query.clientType;
      socket.join(channel);
    }

    socket.on('disconnect', () => {
      socket.disconnect();
    });

    socket.on('session', (data) => {
      if (!channel) {
        channel = `session-${data.sessionID}`;
        socket.join(channel);
      }
    });

    socket.on('cart', () => {
      socket.to(channel).emit('cart');
    });

    socket.on('order', () => {
      socket.to('service').emit('order');
    });
  });
};

module.exports = socket;
