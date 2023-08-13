import express, { Request, Response } from 'express';
import { authRefreshMiddlewre } from '../shared/middlewares';
import { refreshTokenService } from '../services';
import { logger } from '../shared/libs';

const refreshTokenRouter = express.Router();

refreshTokenRouter.get(
  '/auth/refresh',
  authRefreshMiddlewre,
  async (req: Request, res: Response) => {
    logger.info('Refresh token');
    const { refreshToken } = req.cookies;
    const { accessToken, user } = await refreshTokenService(refreshToken);
    logger.info('Refresh token successfully');

    res.status(200).json({
      ok: true,
      data: {
        accessToken,
        user,
      },
    });
  }
);

export { refreshTokenRouter };
