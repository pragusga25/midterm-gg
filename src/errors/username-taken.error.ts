import { HttpError } from '../shared/errors';

export class UsernameTakenError extends HttpError {
  constructor() {
    super(400, 'auth/username-taken');
  }
}
