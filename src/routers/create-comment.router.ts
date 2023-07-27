import { Router } from 'express';
import { createCommentService } from '../services';
import {
  validationBodyMiddleware,
  validationParamsMiddleware,
} from '../shared/middlewares';
import { CreateCommentBodyDto, ValidateVideoIdParamsDto } from '../dtos';

const createCommentRouter = Router();

createCommentRouter.post(
  '/videos/:videoId/comments',
  validationParamsMiddleware(ValidateVideoIdParamsDto),
  validationBodyMiddleware(CreateCommentBodyDto),
  async (req, res) => {
    const data = {
      ...req.body,
      videoId: req.params.videoId,
    };

    await createCommentService(data);

    res.status(201).send({
      ok: true,
    });
  }
);

export { createCommentRouter };
