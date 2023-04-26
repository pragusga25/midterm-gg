import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi.number().positive().required(),
    JWT_ACCESS_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
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
  jwtAccessSecret: envVars.JWT_ACCESS_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
};
