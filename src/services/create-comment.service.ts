import { UserNotFoundError, VideoNotFoundError } from '../errors';
import { Comment, User, UserDoc, Video } from '../models';

type Data = {
  comment: string;
  username?: string;
  videoId: string;
  guestUsername?: string;
};

export const createCommentService = async (data: Data) => {
  const { videoId, username, ...rest } = data;

  const video = await Video.findById(videoId);
  if (!video) throw new VideoNotFoundError();

  let user: UserDoc | undefined = undefined;
  let guestUsername: string | undefined = undefined;

  if (username) {
    user = (await User.findByUsername(username)) ?? undefined;
    if (!user) throw new UserNotFoundError();
  } else {
    guestUsername = data.guestUsername;
  }

  const comment = Comment.build({ ...rest, video, user, guestUsername });
  await comment.save();

  return {
    data: {
      timestamp: comment.timestamp,
      id: comment.id,
      user: user
        ? {
            username: user.username,
            image: user.image,
          }
        : undefined,
    },
  };
};
