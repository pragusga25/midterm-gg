import { Router } from 'express';
import { detailVideoService } from '../services';
import { ValidateIdParamsDto } from '../dtos';
import { validationParamsMiddleware } from '../shared/middlewares';

const detailVideoRouter = Router();

detailVideoRouter.get(
  '/videos/:id',
  validationParamsMiddleware(ValidateIdParamsDto),
  async (req, res) => {
    const result = await detailVideoService(req.params.id);

    res.status(200).send({
      ok: true,
      ...result,
    });
  }
);

export { detailVideoRouter };
