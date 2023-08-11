import express, { Request, Response } from 'express';
import { authRefreshMiddlewre } from '../shared/middlewares';
import { refreshTokenService } from '../services';
import { logger } from '../shared/libs';

const refreshTokenRouter = express.Router();

refreshTokenRouter.get(
  '/auth/refresh',
  authRefreshMiddlewre,
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    logger.info({ refreshToken, path: req.path });
    const { accessToken, user } = await refreshTokenService(refreshToken);

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
