// socket.js
const { Server } = require('socket.io');

let io;

const initSocketIo = (serverHttp) => {
  io = new Server(serverHttp, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Setup your event listeners here
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Add more event listeners and handlers as needed
  });

  return io;
};

const getSocketIoInstance = () => {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initSocketIo first.');
  }
  return io;
};

module.exports = { initSocketIo, getSocketIoInstance };
