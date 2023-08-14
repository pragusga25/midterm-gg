import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class CreateCommentWsDto {
  @JoiSchema(Joi.string().max(100).required())
  readonly comment: string;

  @JoiSchema(Joi.string().optional())
  readonly accessToken?: string;

  @JoiSchema(
    Joi.when('accessToken', {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.string().max(12).required(),
    })
  )
  readonly guestUsername?: string;

  // Mongo ObjectId is 24 characters long and is a hexadecimal string
  @JoiSchema(Joi.string().hex().length(24).required())
  readonly videoId: string;
}
