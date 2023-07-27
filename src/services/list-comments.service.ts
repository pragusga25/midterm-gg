import { Comment } from '../models';

export const listCommentsService = async (videoId: string) => {
  const comments = await Comment.findByVideoId(videoId);

  return { data: comments };
};
