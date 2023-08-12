import { HttpError } from '../shared/errors';

export class UserNotFoundError extends HttpError {
  constructor() {
    super(404, 'user/not-found');
  }
}
