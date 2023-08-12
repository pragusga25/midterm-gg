import { Router } from 'express';
import { findUserByUsernameService } from '../services';
import { FindUserByUsernameParamsDto } from '../dtos';
import { validationParamsMiddleware } from '../shared/middlewares';

const findUserByUsernameRouter = Router();

findUserByUsernameRouter.get(
  '/users/:username',
  validationParamsMiddleware(FindUserByUsernameParamsDto),
  async (req, res) => {
    const username = req.params.username;
    const result = await findUserByUsernameService(username);

    res.status(200).send({
      ok: true,
      ...result,
    });
  }
);

export { findUserByUsernameRouter };
