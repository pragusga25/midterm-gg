import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors';
import { logger } from '../libs';

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

  logger.error(err);

  res.status(status).send(response);
};
