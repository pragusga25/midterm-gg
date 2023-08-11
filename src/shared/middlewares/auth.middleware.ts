import { NextFunction, Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { JwtUtil } from '../utils';
import { MissingAccessTokenError, MissingRefreshTokenError } from '../errors';

const auth =
  (useRefreshToken = false) =>
  (req: IAuthRequest, _res: Response, next: NextFunction) => {
    if (useRefreshToken) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new MissingRefreshTokenError();
      }

      const result = JwtUtil.verifyRefreshToken(refreshToken);
      req.user = result;

      next();

      return;
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new MissingAccessTokenError();
    }

    const result = JwtUtil.verifyAccessToken(token);
    req.user = result;
    next();
  };

const authMiddleware = auth();
const authRefreshMiddlewre = auth(true);

export { authMiddleware, authRefreshMiddlewre };
