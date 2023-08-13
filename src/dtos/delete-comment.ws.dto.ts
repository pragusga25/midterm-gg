import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class DeleteCommentWsDto {
  // Mongo ObjectId is 24 characters long and is a hexadecimal string
  @JoiSchema(Joi.string().hex().length(24).required())
  readonly id: string;

  @JoiSchema(Joi.string().hex().length(24).required())
  readonly videoId: string;

  @JoiSchema(Joi.string().required())
  readonly accessToken: string;
}
