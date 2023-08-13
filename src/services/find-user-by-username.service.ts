import { UserNotFoundError } from '../errors';
import { User } from '../models';

export const findUserByUsernameService = async (username: string) => {
  const user = await User.findByUsername(username);

  if (!user) throw new UserNotFoundError();

  return {
    data: {
      id: user.id,
      username: user.username,
      image: user.image,
      bio: user.bio,
      isOnline: user.isOnline,
    },
  };
};
