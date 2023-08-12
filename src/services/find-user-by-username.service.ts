import { UserNotFoundError } from '../errors';
import { User } from '../models';

export const findUserByUsernameService = async (username: string) => {
  // Remove the version, comments, and products fields from the response
  const user = await User.findByUsername(username);

  if (!user) throw new UserNotFoundError();

  return {
    data: {
      id: user.id,
      username: user.username,
      image: user.image,
    },
  };
};
