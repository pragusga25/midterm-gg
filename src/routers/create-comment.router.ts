import { Router } from 'express';
import { createCommentService } from '../services';
import {
  authMiddleware,
  validationBodyMiddleware,
  validationParamsMiddleware,
} from '../shared/middlewares';
import { CreateCommentBodyDto, ValidateVideoIdParamsDto } from '../dtos';
import { IAuthRequest } from '../shared/interfaces';

const createCommentRouter = Router();

createCommentRouter.post(
  '/videos/:videoId/comments/logged-in',
  validationParamsMiddleware(ValidateVideoIdParamsDto),
  validationBodyMiddleware(CreateCommentBodyDto),
  authMiddleware,
  async (req: IAuthRequest, res) => {
    const data = {
      ...req.body,
      videoId: req.params.videoId,
      username: req.user?.username,
    };

    await createCommentService(data);

    res.status(201).send({
      ok: true,
    });
  }
);

export { createCommentRouter };
