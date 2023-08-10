import { User } from '../models';
import bcrypt from 'bcrypt';
import { IncorrectCredentialError } from '../errors';
import { JwtUtil } from '../shared/utils';

type Data = {
  username: string;
  password: string;
};

export const loginService = async (data: Data) => {
  const { username, password } = data;

  const user = await User.findByUsername(username);
  if (!user) throw new IncorrectCredentialError();

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new IncorrectCredentialError();

  const tokens = JwtUtil.generateTokens({
    id: user.id,
    username: user.username,
  });

  return {
    ...tokens,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};
