import { IJwtPayload } from './jwt';
import { Request } from 'express';

export interface IHttpErrorResponse {
  ok: false;
  error: {
    code: string;
    details?: string[];
  };
}

export interface IAuthRequest extends Request {
  user?: IJwtPayload;
}
