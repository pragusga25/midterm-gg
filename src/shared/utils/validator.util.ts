import { ClassConstructor, plainToInstance } from 'class-transformer';
import { getClassSchema } from 'joi-class-decorators';
import { StringUtil } from './string.util';

export class Validator {
  static validateClassSchema<T extends ClassConstructor<any>>(
    type: T,
    plain: any
  ) {
    const schema = getClassSchema(type);

    const object = plainToInstance(type, plain);

    const { error, value } = schema.validate(object, {
      abortEarly: false,
      allowUnknown: false,
    });
    const details: string[] = [];

    if (error) {
      error.details.forEach((err) => {
        const key = err.context?.key;

        if (key) {
          const newKey = StringUtil.isString(key)
            ? StringUtil.snakeCase(key)
            : key;

          details.push(err.message.replace(key, newKey));
        }
      });
    }

    return {
      error,
      value,
      details,
    };
  }
}
