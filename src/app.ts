import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './shared/middlewares';
import { authRouters } from './auth';
import { API_PREFIX } from './shared/constants';

const app = express();
const routers = [...authRouters];

app.set('trust proxy', true);

app.use(
  cors({
    origin: ['localhost'],
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routers.forEach((router) => app.use(API_PREFIX, router));

app.use(errorMiddleware);
export { app };
