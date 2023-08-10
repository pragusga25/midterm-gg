import { HttpError } from '../shared/errors';

export class IncorrectCredentialError extends HttpError {
  constructor() {
    super(400, 'auth/incorrect-credential');
  }
}
