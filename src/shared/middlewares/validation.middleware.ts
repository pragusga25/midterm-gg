import { ClassConstructor, plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';
import { getClassSchema } from 'joi-class-decorators';
import { StringUtil } from '../utils';
import { HttpError } from '../errors';

type Args = 'body' | 'params' | 'query';

const validationMiddleware =
  (arg: Args) =>
  <T extends ClassConstructor<any>>(type: T): RequestHandler => {
    return (req, _res, next) => {
      const schema = getClassSchema(type);

      const object = plainToInstance(type, req[arg]);

      const { error, value } = schema.validate(object, {
        abortEarly: false,
        allowUnknown: false,
      });

      if (error) {
        const details: string[] = [];
        error.details.forEach((err) => {
          const key = err.context?.key;

          if (key) {
            const newKey = StringUtil.isString(key)
              ? StringUtil.snakeCase(key)
              : key;

            details.push(err.message.replace(key, newKey));
          }
        });

        next(new HttpError(400, `request/invalid-${arg}`, details));
        return;
      }

      req[arg] = value;
      next();
    };
  };

const validationBodyMiddleware = validationMiddleware('body');
const validationParamsMiddleware = validationMiddleware('params');
const validationQueryMiddleware = validationMiddleware('query');

export {
  validationBodyMiddleware,
  validationParamsMiddleware,
  validationQueryMiddleware,
};
