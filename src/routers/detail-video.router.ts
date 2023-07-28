import { Router } from 'express';
import { detailVideoService } from '../services';

const detailVideoRouter = Router();

detailVideoRouter.get('/videos/:id', async (req, res) => {
  const result = await detailVideoService(req.params.id);

  res.status(200).send({
    ok: true,
    ...result,
  });
});

export { detailVideoRouter };
