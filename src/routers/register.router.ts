import { Router } from 'express';
import { validationBodyMiddleware } from '../shared/middlewares';
import { RegisterBodyDto } from '../dtos';
import { registerService } from '../services';

const registerRouter = Router();

registerRouter.post(
  '/auth/register',
  validationBodyMiddleware(RegisterBodyDto),
  async (req, res) => {
    await registerService(req.body);
    res.status(201).send({
      ok: true,
    });
  }
);

export { registerRouter };
