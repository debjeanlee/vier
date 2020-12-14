import { io } from 'socket.io-client';

export default (() => {
  let socket;

  const connect = (sessionID) => {
    socket = io.connect(process.env.SERVER, { query: { sessionID } });
    socket.on('connect', function (data) {});
  };

  const transmitCart = () => socket.emit('cart');

  const receiveCart = (cb) =>
    socket.on('cart', () => {
      cb();
    });

  return {
    connect,
    transmitCart,
    receiveCart,
  };
})();
