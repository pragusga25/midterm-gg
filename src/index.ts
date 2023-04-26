import { app } from './app';
import { config } from './shared/config';
import { logger } from './shared/libs';

const start = async () => {
  const port = config.port;

  app.listen(config.port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

start();
