import { Router } from 'express';
import { validationBodyMiddleware } from '../shared/middlewares';
import { LoginBodyDto } from '../dtos';
import { loginService } from '../services';
import { HttpUtil } from '../shared/utils';
import { logger } from '../shared/libs';

const loginRouter = Router();

loginRouter.post(
  '/auth/login',
  validationBodyMiddleware(LoginBodyDto),
  async (req, res) => {
    logger.info({
      message: 'Login request received',
      username: req.body.username,
    });

    const { accessToken, refreshToken, user } = await loginService(req.body);

    HttpUtil.attachRefreshToken(res, refreshToken);

    logger.info({
      message: 'Login request completed',
      username: req.body.username,
    });

    res.status(200).send({
      ok: true,
      data: {
        accessToken,
        user,
      },
    });
  }
);

export { loginRouter };
