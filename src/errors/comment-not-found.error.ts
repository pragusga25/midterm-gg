import { HttpError } from '../shared/errors';

export class CommentNotFoundError extends HttpError {
  constructor() {
    super(404, 'comment/not-found');
  }
}
