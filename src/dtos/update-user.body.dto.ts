import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class UpdateUserBodyDto {
  @JoiSchema(Joi.string().max(100).optional())
  readonly bio?: string;

  @JoiSchema(Joi.boolean().optional().default(false))
  readonly removeImage: boolean;
}
