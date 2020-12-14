import { io } from 'socket.io-client';

export default (() => {
  let socket;

  const connect = () => {
    socket = io.connect(process.env.SERVER);
  };

  const disconnect = () => socket.emit('disconnect');

  const session = (sessionID) => socket.emit('session', { sessionID });

  const transmitCart = () => socket.emit('cart');

  const receiveCart = (cb) =>
    socket.on('cart', () => {
      cb();
    });

  return {
    connect,
    disconnect,
    session,
    transmitCart,
    receiveCart,
  };
})();
