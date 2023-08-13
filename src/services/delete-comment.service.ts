import { CommentNotFoundError, ForbiddenDeleteCommentrror } from '../errors';
import { Comment } from '../models';

type Data = {
  id: string;
  userId: string;
};

export const deleteCommentService = async (data: Data) => {
  const { id, userId } = data;

  const comment = await Comment.findById(id).populate('user', 'id');

  if (!comment) throw new CommentNotFoundError();
  if (comment.user.id !== userId) throw new ForbiddenDeleteCommentrror();

  await comment.deleteOne();
};
