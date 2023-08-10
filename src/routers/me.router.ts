import express, { Response } from 'express';
import { authMiddleware } from '../shared/middlewares';
import { IAuthRequest } from '../shared/interfaces';

const meRouter = express.Router();

meRouter.get(
  '/auth/me',
  authMiddleware,
  async (req: IAuthRequest, res: Response) => {
    res.status(200).json({
      ok: true,
      data: req.user,
    });
  }
);

export { meRouter };
