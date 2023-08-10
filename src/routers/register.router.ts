import { Router } from 'express';
import { validationBodyMiddleware } from '../shared/middlewares';
import { RegisterBodyDto } from '../dtos';
import { registerService } from '../services';
import { HttpUtil } from '../shared/utils';

const registerRouter = Router();

registerRouter.post(
  '/auth/register',
  validationBodyMiddleware(RegisterBodyDto),
  async (req, res) => {
    const result = await registerService(req.body);
    const { refreshToken, ...rest } = result;

    HttpUtil.attachRefreshToken(res, refreshToken);

    res.status(201).send({
      ok: true,
      data: rest,
    });
  }
);

export { registerRouter };
