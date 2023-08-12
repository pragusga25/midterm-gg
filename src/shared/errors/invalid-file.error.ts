import { HttpError } from '.';

export class InvalidFileError extends HttpError {
  constructor() {
    super(400, 'file/invalid');
  }
}
