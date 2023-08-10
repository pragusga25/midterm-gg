import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

const FE_LOCAL = 'http://localhost:5173';

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .default('development'),
    PORT: joi.number().positive().required(),
    MONGO_URI: joi.string().uri().required(),
    JWT_ACCESS_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    ALLOWED_ORIGIN: joi.string().optional().default(FE_LOCAL).not('*'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  isProduction: envVars.NODE_ENV === 'production',
  mongoUri: envVars.MONGO_URI,
  jwtAccessSecret: envVars.JWT_ACCESS_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
  allowedOrigin: envVars.ALLOWED_ORIGIN,
};
