import io from 'socket.io/client-dist/socket.io.min.js';

const socket = io.connect(process.env.SERVER);

export const transmit = () =>
  socket.emit('chat', {
    message: '',
  });

export const receive = () =>
  socket.on('chat', {
    message: '',
  });
