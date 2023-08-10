import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class LoginBodyDto {
  @JoiSchema(Joi.string().required())
  readonly username: string;

  @JoiSchema(Joi.string().required())
  readonly password: string;
}
