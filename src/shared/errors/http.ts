import { IHttpErrorResponse } from '../interfaces';

export class HttpError extends Error {
  status: number;
  response: IHttpErrorResponse;

  constructor(status: number, code: string, details?: string[]) {
    super(details?.join(', '));
    this.status = status;
    this.response = {
      ok: false,
      error: {
        code,
        details,
      },
    };
  }
}
