import { Router } from 'express';
import { listCommentsService } from '../services';
import { validationParamsMiddleware } from '../shared/middlewares';
import { ValidateVideoIdParamsDto } from '../dtos';

const listCommentsRouter = Router();

listCommentsRouter.get(
  '/videos/:videoId/comments',
  validationParamsMiddleware(ValidateVideoIdParamsDto),
  async (req, res) => {
    const result = await listCommentsService(req.params.videoId);

    res.status(200).send({
      ok: true,
      ...result,
    });
  }
);

export { listCommentsRouter };
