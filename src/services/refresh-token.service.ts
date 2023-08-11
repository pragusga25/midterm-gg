import { JwtUtil } from '../shared/utils';

export const refreshTokenService = async (refreshToken: string) => {
  const user = JwtUtil.verifyRefreshToken(refreshToken);

  const accessToken = JwtUtil.generateAccessToken(user);

  return { accessToken, user };
};
