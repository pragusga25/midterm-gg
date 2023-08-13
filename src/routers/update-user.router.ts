import { Router } from 'express';
import {
  authMiddleware,
  multerImageMiddleware,
  validationBodyMiddleware,
} from '../shared/middlewares';
import { UpdateUserBodyDto } from '../dtos';
import { IAuthRequest } from '../shared/interfaces';
import { updateUserService } from '../services';
import { logger } from '../shared/libs';

const updateUserRouter = Router();

updateUserRouter.patch(
  '/users',
  authMiddleware,
  multerImageMiddleware,
  validationBodyMiddleware(UpdateUserBodyDto),
  async (req: IAuthRequest, res) => {
    const userId = req.user?.id;

    const file = req.file;
    const data = {
      ...req.body,
      image: file,
      id: userId,
    };

    logger.info('Update user: ', data);

    await updateUserService(data);

    logger.info('Update user successfully');

    res.status(201).send({
      ok: true,
    });
  }
);

export { updateUserRouter };
