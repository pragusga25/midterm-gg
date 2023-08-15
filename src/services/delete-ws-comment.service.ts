import { Server } from 'socket.io';
import { JwtUtil, Validator } from '../shared/utils';
import { logger } from '../shared/libs';
import { DeleteCommentWsDto } from '../dtos';
import { deleteCommentService } from '.';

type Data = {
  id: string;
  accessToken: string;
  videoId: string;
};

export const deleteWsCommentService = async (io: Server, data: Data) => {
  logger.info('comment:deleted event received');
  logger.info(data);

  const { error, details } = Validator.validateClassSchema(
    DeleteCommentWsDto,
    data
  );

  if (error) {
    logger.error(details);
    throw error;
  }

  const { accessToken, id, videoId } = data;
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
};
