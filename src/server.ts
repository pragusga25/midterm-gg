import http from 'http';
import { app } from './app';
import { Server } from 'socket.io';
import { JwtUtil, Validator } from './shared/utils';
import { logger } from './shared/libs';
import { config } from './shared/config';
import { CreateCommentWsDto, DeleteCommentWsDto } from './dtos';
import { createCommentService, deleteCommentService } from './services';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.allowedOrigin,
  },
});

type CommentData = {
  comment: string;
  videoId: string;
  accessToken?: string;
  guestUsername?: string;
};

type CommentDeletedData = {
  id: string;
  accessToken: string;
  videoId: string;
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

    const { accessToken, videoId, ...rest } = msg;
    try {
      if (error) {
        logger.error(details);
        return;
      }

      let username: string | undefined = undefined;
      if (accessToken) {
        username = JwtUtil.verifyAccessToken(accessToken).username;
      }

      const { data } = await createCommentService({
        videoId,
        username,
        ...rest,
      });

      io.emit(`${videoId}:comment`, {
        ...rest,
        ...data,
      });
    } catch (err) {
      logger.error(err);
    } finally {
      logger.info('comment event handled');
    }
  });

  socket.on('comment:deleted', async (msg: CommentDeletedData) => {
    logger.info('comment:deleted event received');
    logger.info(msg);

    const { error, details } = Validator.validateClassSchema(
      DeleteCommentWsDto,
      msg
    );

    if (error) {
      logger.error(details);
      throw error;
    }

    const { accessToken, id, videoId } = msg;
    try {
      const { id: userId } = JwtUtil.verifyAccessToken(accessToken);
      await deleteCommentService({
        id,
        userId,
      });

      io.emit(`${videoId}:comment:deleted`, {
        id,
      });
    } catch (err) {
      logger.error(err);
    } finally {
      logger.info('comment:deleted event handled');
    }
  });
});

export { server };
