import { sign, verify, JsonWebTokenError } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces';
import { config } from '../config';
import { TokenExpiredError, TokenInvalidError } from '../errors';

export class JwtUtil {
  static generateAccessToken(payload: IJwtPayload) {
    return sign(payload, config.jwtAccessSecret, {
      expiresIn: '15m',
    });
  }

  static generateRefreshToken(payload: IJwtPayload) {
    return sign(payload, config.jwtRefreshSecret, {
      expiresIn: '7d',
    });
  }

  static verifyAccessToken(token: string) {
    try {
      return verify(token, config.jwtAccessSecret) as IJwtPayload;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        this.handleJwtError(err);
      }
      throw err;
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      return verify(token, config.jwtRefreshSecret) as IJwtPayload;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        this.handleJwtError(err);
      }
      throw err;
    }
  }

  static generateTokens(payload: IJwtPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private static handleJwtError(err: JsonWebTokenError) {
    if (err.name === 'TokenExpiredError') throw new TokenExpiredError();
    throw new TokenInvalidError();
  }
}
