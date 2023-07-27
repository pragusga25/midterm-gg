import { Router } from 'express';
import { listVideosService } from '../services';

const listVideosRouter = Router();

listVideosRouter.get('/videos', async (_req, res) => {
  const result = await listVideosService();

  res.status(200).send({
    ok: true,
    ...result,
  });
});

export { listVideosRouter };
