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

    socket.on('confirm_order', (data) => {
      console.log('confirming');
      // customer
      socket.to(`session-${data.sessionID}`).emit('cart');
      // service
      socket.to('service').emit('order');
      // kitchen
    });

    socket.on('checkout', (data) => {
      /**
       * update session/order/table database here
       * import models before line 1
       * tableID will be pass in from `data.tableID`
       * socket emit only after successful update
       */
      // socket.to('service').emit('checkout');
    });
  });
};

module.exports = socket;
