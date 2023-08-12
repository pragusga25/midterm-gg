import express, { Response } from 'express';
import { authMiddleware } from '../shared/middlewares';
import { IAuthRequest } from '../shared/interfaces';
import { getMyDataService } from '../services';

const meRouter = express.Router();

meRouter.get(
  '/auth/me',
  authMiddleware,
  async (req: IAuthRequest, res: Response) => {
    const result = await getMyDataService(req.user!.id);

    res.status(200).json({
      ok: true,
      ...result,
    });
  }
);

export { meRouter };
