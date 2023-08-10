import { HttpError } from '.';

export class TokenExpiredError extends HttpError {
  constructor() {
    super(401, 'auth/token-expired');
  }
}
