import { io } from 'socket.io-client';

export default (() => {
  let socket;

  const connect = (sessionID) => {
    socket = io.connect(process.env.SERVER, { query: { sessionID } });
    socket.on('connect', function (data) {});
  };

  const transmit = () =>
    socket.emit('cart', {
      message: '',
    });

  const receive = () =>
    socket.on('cart', {
      message: '',
    });

  return {
    connect,
  };
})();
