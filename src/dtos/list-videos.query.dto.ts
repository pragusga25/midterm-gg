import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class ListVideosQueryDto {
  @JoiSchema(Joi.string().optional().trim())
  readonly search?: string;
}
