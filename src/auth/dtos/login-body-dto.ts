import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../../shared/libs';

export class LoginBodyDto {
  @JoiSchema(Joi.string().min(3).required())
  readonly username: string;

  @JoiSchema(Joi.number().integer().min(1).max(5).required())
  readonly password: number;
}
