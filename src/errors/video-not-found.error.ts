import { HttpError } from '../shared/errors';

export class VideoNotFoundError extends HttpError {
  constructor() {
    super(404, 'video/not-found');
  }
}
