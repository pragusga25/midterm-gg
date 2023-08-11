import http from 'http';
import { app } from './app';
import { Server } from 'socket.io';
import { JwtUtil } from './shared/utils';
import { logger } from './shared/libs';
import { Comment, Video } from './models';
import { VideoNotFoundError } from './errors';
import { config } from './shared/config';

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
    logger.info(msg);
    const { accessToken, videoId, ...rest } = msg;
    try {
      const { username } = JwtUtil.verifyAccessToken(accessToken);
      const video = await Video.findById(videoId);

      if (!video) throw new VideoNotFoundError();

      const comment = Comment.build({
        ...rest,
        video,
        username,
      });

      await comment.save();
      io.emit(`${videoId}:comment`, {
        id: comment.id,
        ...rest,
        username,
      });
    } catch (err) {
      logger.error(err);
    }
  });
});

export { server };
