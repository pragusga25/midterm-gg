import { server } from './server';
import { config } from './shared/config';
import { logger } from './shared/libs';
import mongoose from 'mongoose';

const start = async () => {
  const port = config.port;

  await mongoose.connect(config.mongoUri);

  server.listen(config.port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

start();
