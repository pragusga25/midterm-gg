import { ClassConstructor } from 'class-transformer';
import { RequestHandler } from 'express';
import { Validator } from '../utils';
import { HttpError } from '../errors';

type Args = 'body' | 'params' | 'query';

const validationMiddleware =
  (arg: Args) =>
  <T extends ClassConstructor<any>>(type: T): RequestHandler => {
    return (req, _res, next) => {
      const { error, value, details } = Validator.validateClassSchema(
        type,
        req[arg]
      );

      if (error) throw new HttpError(400, `request/invalid-${arg}`, details);

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
