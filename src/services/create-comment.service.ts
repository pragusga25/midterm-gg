import { VideoNotFoundError } from '../errors';
import { Comment, Video } from '../models';

type Data = {
  comment: string;
  username: string;
  videoId: string;
};

export const createCommentService = async (data: Data) => {
  const { videoId, ...rest } = data;

  const video = await Video.findById(videoId);

  if (!video) throw new VideoNotFoundError();

  const comment = Comment.build({ ...rest, video });
  await comment.save();
};
