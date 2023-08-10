import { HttpError } from '.';

export class MissingAccessTokenError extends HttpError {
  constructor() {
    super(401, 'auth/missing-access-token');
  }
}
