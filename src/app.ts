import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { errorMiddleware } from './shared/middlewares';
import { API_PREFIX } from './shared/constants';
import { routers } from './routers';

const app = express();

app.set('trust proxy', true);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(API_PREFIX, ...routers);

app.use(errorMiddleware);
export { app };
