import { createCommentRouter } from './create-comment.router';
import { detailVideoRouter } from './detail-video.router';
import { listCommentsRouter } from './list-comments.router';
import { listProductsRouter } from './list-products.router';
import { listVideosRouter } from './list-videos.router';

export const routers = [
  createCommentRouter,
  listCommentsRouter,
  listProductsRouter,
  listVideosRouter,
  detailVideoRouter,
];
