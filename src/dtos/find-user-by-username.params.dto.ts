import { JoiSchema } from 'joi-class-decorators';
import { Joi } from '../shared/libs';

export class FindUserByUsernameParamsDto {
  @JoiSchema(Joi.string().required())
  readonly username: string;
}
