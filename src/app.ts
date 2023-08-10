import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errorMiddleware, rateLimitMiddleware } from './shared/middlewares';
import { API_PREFIX } from './shared/constants';
import { routers } from './routers';
import cors from 'cors';
import { config } from './shared/config';

const app = express();

app.set('trust proxy', true);

app.use(
  cors({
    origin: config.allowedOrigin,
    credentials: true,
  })
);
app.use(rateLimitMiddleware);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(API_PREFIX, ...routers);
app.get('/', (_req, res) => res.send({ ok: true }));

app.use(errorMiddleware);
export { app };
