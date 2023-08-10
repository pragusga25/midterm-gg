import express, { Request, Response } from 'express';
import { authMiddleware } from '../shared/middlewares';
import { refreshTokenService } from '../services';

const refreshTokenRouter = express.Router();

refreshTokenRouter.get(
  '/auth/refresh',
  authMiddleware,
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
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
