import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces';
import { config } from '../config';

export class JwtUtil {
  static generateAccessToken(payload: IJwtPayload) {
    return jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: '15m',
    });
  }

  static generateRefreshToken(payload: IJwtPayload) {
    return jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: '7d',
    });
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, config.jwtAccessSecret) as IJwtPayload;
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, config.jwtRefreshSecret) as IJwtPayload;
  }
}
