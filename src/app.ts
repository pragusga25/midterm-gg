import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './shared/middlewares';

const app = express();

app.set('trust proxy', true);

app.use(
  cors({
    origin: '*',
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);
export { app };
