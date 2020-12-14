import io from 'socket.io/client-dist/socket.io.min.js';

export default (() => {
  let socket;

  const connect = (sessionID) => {
    socket = io.connect(process.env.SERVER, { query: sessionID });
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
