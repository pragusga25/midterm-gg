import { Router } from 'express';
import { listProductsService } from '../services';
import { validationParamsMiddleware } from '../shared/middlewares';
import { ValidateVideoIdParamsDto } from '../dtos';

const listProductsRouter = Router();

listProductsRouter.get(
  '/videos/:videoId/products',
  validationParamsMiddleware(ValidateVideoIdParamsDto),
  async (req, res) => {
    const result = await listProductsService(req.params.videoId);

    res.status(200).send({
      ok: true,
      ...result,
    });
  }
);

export { listProductsRouter };
