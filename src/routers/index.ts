import { createCommentRouter } from './create-comment.router';
import { detailVideoRouter } from './detail-video.router';
import { findUserByUsernameRouter } from './find-user-by-username.router';
import { listCommentsRouter } from './list-comments.router';
import { listProductsRouter } from './list-products.router';
import { listVideosRouter } from './list-videos.router';
import { loginRouter } from './login.router';
import { logoutRouter } from './logout.router';
import { meRouter } from './me.router';
import { refreshTokenRouter } from './refresh-token.router';
import { registerRouter } from './register.router';

export const routers = [
  meRouter,
  loginRouter,
  logoutRouter,
  registerRouter,
  listVideosRouter,
  detailVideoRouter,
  listCommentsRouter,
  listProductsRouter,
  refreshTokenRouter,
  createCommentRouter,
  findUserByUsernameRouter,
];
