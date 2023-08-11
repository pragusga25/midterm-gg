import { Router } from 'express';
import { logger } from '../shared/libs';

const logoutRouter = Router();

logoutRouter.get('/auth/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  logger.info({ refreshToken, path: req.path });
  if (!refreshToken) {
    res.status(200).send({ ok: true });
    return;
  }

  res.clearCookie('refreshToken');
  res.status(200).send({ ok: true });
});

export { logoutRouter };
