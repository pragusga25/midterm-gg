import { NextFunction, Response } from 'express';
import { IAuthRequest, Role } from '../interfaces';
import { JwtUtil } from '../utils';
import { HttpError } from '../errors';

export const authMiddleware =
  (role?: Role | Role[]) =>
  (req: IAuthRequest, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new HttpError(401, 'auth/missing-token'));
    }

    try {
      const result = JwtUtil.verifyAccessToken(token);
      req.user = result;
      if (role && !role.includes(result.role)) {
        return next(new HttpError(403, 'auth/forbidden'));
      }
      next();
    } catch {
      next(new HttpError(401, 'auth/invalid-token'));
    }
  };
