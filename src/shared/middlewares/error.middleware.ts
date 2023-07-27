import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors';

export const errorMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const response = err.response ?? {
    ok: false,
    error: {
      code: 'internal-server-error',
    },
  };

  res.status(status).send(response);
};
