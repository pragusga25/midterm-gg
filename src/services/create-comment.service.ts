import { UserNotFoundError, VideoNotFoundError } from '../errors';
import { Comment, User, Video } from '../models';

type Data = {
  comment: string;
  username: string;
  videoId: string;
};

export const createCommentService = async (data: Data) => {
  const { videoId, username, ...rest } = data;

  const videoPromise = Video.findById(videoId);
  const userPromise = User.findByUsername(username);

  const [video, user] = await Promise.all([videoPromise, userPromise]);

  if (!video) throw new VideoNotFoundError();
  if (!user) throw new UserNotFoundError();

  const comment = Comment.build({ ...rest, video, user });
  await comment.save();

  return {
    data: {
      timestamp: comment.timestamp,
      id: comment.id,
      user: {
        username: user.username,
        image: user.image,
      },
    },
  };
};
