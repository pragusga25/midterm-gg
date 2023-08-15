import http from 'http';
import { app } from './app';
import { Server } from 'socket.io';
import { config } from './shared/config';
import { createWsCommentService, deleteWsCommentService } from './services';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.allowedOrigin,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.disconnect();
  });

  socket.on('comment', (data) => createWsCommentService(io, data));
  socket.on('comment:deleted', (data) => deleteWsCommentService(io, data));
});

export { server };
