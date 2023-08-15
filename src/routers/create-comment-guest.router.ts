import { Router } from 'express';
import { createCommentService } from '../services';
import {
  validationBodyMiddleware,
  validationParamsMiddleware,
} from '../shared/middlewares';
import { CreateCommentGuestBodyDto, ValidateVideoIdParamsDto } from '../dtos';

const createCommentGuestRouter = Router();

createCommentGuestRouter.post(
  '/videos/:videoId/comments/guest',
  validationParamsMiddleware(ValidateVideoIdParamsDto),
  validationBodyMiddleware(CreateCommentGuestBodyDto),
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

export { createCommentGuestRouter };
