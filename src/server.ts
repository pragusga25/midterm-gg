import http from 'http';
import { app } from './app';
import { Server } from 'socket.io';
import { JwtUtil, Validator } from './shared/utils';
import { logger } from './shared/libs';
import { config } from './shared/config';
import { CreateCommentWsDto } from './dtos';
import { createCommentService } from './services';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.allowedOrigin,
  },
});

type CommentData = {
  comment: string;
  videoId: string;
  accessToken: string;
};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.disconnect();
  });

  socket.on('comment', async (msg: CommentData) => {
    logger.info('comment event received');
    logger.info(msg);

    const { error, details } = Validator.validateClassSchema(
      CreateCommentWsDto,
      msg
    );

    if (error) {
      logger.error(details);
      throw error;
    }

    const { accessToken, videoId, ...rest } = msg;
    try {
      const { username } = JwtUtil.verifyAccessToken(accessToken);
      const {
        data: { id, timestamp },
      } = await createCommentService({ videoId, username, ...rest });

      io.emit(`${videoId}:comment`, {
        ...rest,
        id: id,
        username,
        timestamp: timestamp,
      });
    } catch (err) {
      logger.error(err);
    } finally {
      logger.info('comment event handled');
    }
  });
});

export { server };
