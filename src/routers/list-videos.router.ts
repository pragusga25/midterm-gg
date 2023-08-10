import { Router } from 'express';
import { listVideosService } from '../services';
import { validationQueryMiddleware } from '../shared/middlewares';
import { ListVideosQueryDto } from '../dtos';

const listVideosRouter = Router();

listVideosRouter.get(
  '/videos',
  validationQueryMiddleware(ListVideosQueryDto),
  async (req, res) => {
    const result = await listVideosService(req.query.search as string);

    res.status(200).send({
      ok: true,
      ...result,
    });
  }
);

export { listVideosRouter };
