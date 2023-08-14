import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class CreateCommentBodyDto {
  @JoiSchema(Joi.string().max(12).required())
  readonly username: string;

  @JoiSchema(Joi.string().max(100).required())
  readonly comment: string;
}
