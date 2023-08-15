import { Server } from 'socket.io';
import { JwtUtil, Validator } from '../shared/utils';
import { logger } from '../shared/libs';
import { CreateCommentWsDto } from '../dtos';
import { createCommentService } from '.';

type Data = {
  comment: string;
  videoId: string;
  accessToken?: string;
  guestUsername?: string;
};

export const createWsCommentService = async (io: Server, data: Data) => {
  logger.info('comment event received');
  logger.info(data);

  const { error, details } = Validator.validateClassSchema(
    CreateCommentWsDto,
    data
  );

  const { accessToken, videoId, ...rest } = data;
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
};
