import { io } from 'socket.io-client';

export default (() => {
  let socket;

  const connect = () => {
    socket = io.connect(process.env.SERVER);
  };

  const disconnect = () => socket.emit('disconnect');

  const session = (sessionID) => socket.emit('session', { sessionID });

  const transmit = (type) => socket.emit(type);

  const receive = (type, cb) =>
    socket.on(type, () => {
      cb();
    });

  return {
    connect,
    disconnect,
    session,
    transmit,
    receive,
  };
})();
