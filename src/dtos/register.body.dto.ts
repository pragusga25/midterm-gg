import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class RegisterBodyDto {
  @JoiSchema(
    Joi.string()
      .max(12)
      .regex(/^[a-zA-Z0-9_]+$/) // letters, numbers, underscores
      .trim()
      .required()
  )
  readonly username: string;

  @JoiSchema(Joi.string().min(8).max(50).required())
  readonly password: string;
}
