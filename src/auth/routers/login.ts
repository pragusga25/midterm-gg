import express, { NextFunction, Request, Response } from 'express';
import { LoginBodyDto } from '../dtos';
import { validationMiddleware } from '../../shared/middlewares';

const loginRouter = express.Router();

loginRouter.post(
  '/auth/login',
  validationMiddleware(LoginBodyDto),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send('OK');
    } catch (err) {
      next(err);
    }
  }
);

export { loginRouter };
