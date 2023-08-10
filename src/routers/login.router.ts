import { Router } from 'express';
import { validationBodyMiddleware } from '../shared/middlewares';
import { LoginBodyDto } from '../dtos';
import { loginService } from '../services';
import { HttpUtil } from '../shared/utils';

const loginRouter = Router();

loginRouter.post(
  '/auth/login',
  validationBodyMiddleware(LoginBodyDto),
  async (req, res) => {
    const { accessToken, refreshToken } = await loginService(req.body);

    HttpUtil.attachRefreshToken(res, refreshToken);

    res.status(200).send({
      ok: true,
      data: {
        accessToken,
      },
    });
  }
);

export { loginRouter };
