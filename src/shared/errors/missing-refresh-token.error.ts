import { HttpError } from '.';

export class MissingRefreshTokenError extends HttpError {
  constructor() {
    super(401, 'auth/missing-refresh-token');
  }
}
