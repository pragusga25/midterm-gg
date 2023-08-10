import { JwtUtil } from '../shared/utils';

export const refreshTokenService = async (refreshToken: string) => {
  const { id, username } = JwtUtil.verifyRefreshToken(refreshToken);

  const jwtPayload = {
    id,
    username,
  };

  const accessToken = JwtUtil.generateAccessToken(jwtPayload);

  return { accessToken, user: jwtPayload };
};
