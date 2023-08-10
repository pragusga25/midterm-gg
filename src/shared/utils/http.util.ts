import { Response } from 'express';

export class HttpUtil {
  static attachRefreshToken(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
  }
}
