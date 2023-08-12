import { UserNotFoundError } from '../errors';
import { User } from '../models';

export const findUserByUsernameService = async (username: string) => {
  // Remove the version, comments, and products fields from the response
  const user = await User.findByUsername(username);

  if (!user) throw new UserNotFoundError();

  const { password, ...rest } = user;

  return { data: rest };
};
