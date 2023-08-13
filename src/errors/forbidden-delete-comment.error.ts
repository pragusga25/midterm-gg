import { HttpError } from '../shared/errors';

export class ForbiddenDeleteCommentrror extends HttpError {
  constructor() {
    super(403, 'comment/forbidden-delete-comment');
  }
}
