import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class CreateCommentGuestBodyDto {
  @JoiSchema(Joi.string().max(12).required())
  readonly guestUsername: string;

  @JoiSchema(Joi.string().max(100).required())
  readonly comment: string;
}
