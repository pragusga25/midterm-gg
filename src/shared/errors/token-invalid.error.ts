import { HttpError } from '.';

export class TokenInvalidError extends HttpError {
  constructor() {
    super(401, 'auth/token-invalid');
  }
}
