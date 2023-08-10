import JoiDate from '@joi/date';

import * as JoiImport from 'joi';

export const Joi: JoiImport.Root = JoiImport.extend(JoiDate);
