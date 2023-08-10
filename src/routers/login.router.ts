import { Router } from 'express';
import { validationBodyMiddleware } from '../shared/middlewares';
import { LoginBodyDto } from '../dtos';
import { loginService } from '../services';

const loginRouter = Router();

loginRouter.post(
  '/auth/login',
  validationBodyMiddleware(LoginBodyDto),
  async (req, res) => {
    const { accessToken, refreshToken } = await loginService(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    res.status(200).send({
      ok: true,
      data: {
        accessToken,
      },
    });
  }
);

export { loginRouter };
