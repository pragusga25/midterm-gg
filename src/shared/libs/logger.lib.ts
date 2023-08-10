import { createLogger, format, transports } from 'winston';
import { config } from '../config';

const { combine, timestamp, json, errors, metadata, prettyPrint, colorize } =
  format;
const { Console } = transports;
const { isProduction } = config;

const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    timestamp(),
    json(),
    errors({ stack: true }),
    metadata(),
    prettyPrint(),
    colorize({ all: true })
  ),
  transports: [new Console()],
});

export { logger };
