import { JwtUtil } from '../shared/utils';

export const refreshTokenService = async (refreshToken: string) => {
  const { id, username, image } = JwtUtil.verifyRefreshToken(refreshToken);

  const user = {
    id,
    username,
    image,
  };

  const accessToken = JwtUtil.generateAccessToken(user);

  return { accessToken, user };
};
